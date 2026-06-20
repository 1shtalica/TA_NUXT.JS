import type {
  Event,
  EventListResult,
  EventPagination,
  GetEventsParams,
  HomeEventCard,
} from '~/types/event'
import {
  APPROVED_EVENT_CATEGORIES,
  normalizeEventCategoryList,
} from '~/constants/event-categories'

export class EventListRequestError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message)
    this.name = 'EventListRequestError'
  }
}

const normalizeEventPagination = (
  pagination: Partial<EventPagination> | undefined,
  limit: number,
): EventPagination => ({
  limit: pagination?.limit ?? limit,
  has_more: pagination?.has_more ?? false,
  next_cursor: pagination?.next_cursor ?? null,
})

const buildEventListSearchParams = (params: GetEventsParams = {}) => {
  const {
    limit = 10, cursor, type = '', q = '', search,
    category = '', province = '', price = '', sort = '',
  } = params
  const urlParams = new URLSearchParams({ limit: String(Math.min(Math.max(limit, 1), 100)) })
  if (cursor) urlParams.set('cursor', cursor)
  if (type) urlParams.set('type', type)
  if (search ?? q) urlParams.set('search', search ?? q)
  if (category) urlParams.set('category', category)
  if (province) urlParams.set('province', province)
  if (price) urlParams.set('price', price)
  if (sort) urlParams.set('sort', sort)
  return urlParams
}

export const EventService = {
  async getEvents(
    apiFetch: typeof $fetch,
    params: GetEventsParams = {},
  ): Promise<EventListResult> {
    const urlParams = buildEventListSearchParams(params)
    try {
      const json = await apiFetch<{ data: HomeEventCard[]; pagination: EventPagination }>(
        `/api/proxy/events?${urlParams.toString()}`,
      )
      return {
        data: json.data ?? [],
        pagination: normalizeEventPagination(json.pagination, Number(urlParams.get('limit')) || 10),
      }
    } catch (err: unknown) {
      const status = (err as { statusCode?: number })?.statusCode ?? 500
      throw new EventListRequestError(`Fetch failed: ${status}`, status)
    }
  },

  async getEventsClient(
    params: GetEventsParams = {},
  ): Promise<EventListResult> {
    const config = useRuntimeConfig()
    const baseUrl = config.public.apiBaseUrl as string
    const urlParams = buildEventListSearchParams(params)
    const response = await fetch(`${baseUrl}/events?${urlParams.toString()}`)
    if (!response.ok) throw new EventListRequestError(`Fetch failed: ${response.status}`, response.status)
    const json = await response.json()
    return {
      data: json.data ?? [],
      pagination: normalizeEventPagination(json.pagination, Number(urlParams.get('limit')) || 10),
    }
  },

  async getRandomEvents(apiFetch: typeof $fetch): Promise<HomeEventCard[]> {
    try {
      const json = await apiFetch<{ data: HomeEventCard[] }>('/api/proxy/events/random')
      return json.data || []
    } catch {
      return []
    }
  },

  async getEventBySlug(apiFetch: typeof $fetch, slug: string): Promise<Event | null> {
    try {
      const json = await apiFetch<{ data: Event }>(`/api/proxy/events/${slug}`)
      return json.data ?? null
    } catch {
      return null
    }
  },

  async getEventCategories(apiFetch: typeof $fetch): Promise<string[]> {
    try {
      const json = await apiFetch<{ data: unknown }>('/api/proxy/categories')
      return normalizeEventCategoryList(json.data)
    } catch {
      return [...APPROVED_EVENT_CATEGORIES]
    }
  },
}

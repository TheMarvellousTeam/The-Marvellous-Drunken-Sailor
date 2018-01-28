export const SRV_AD = 'http://localhost:8088'

export const SHIP_SPEC = {
  scout: {
    pa: 5,
    fire_cost: 2,
    fire_pattern: 'circular',
    min_range: 0,
    max_range: 5,
    damage: 1,
  },
  heavy: {
    pa: 3,
    fire_cost: 2,
    fire_pattern: 'line',
    min_range: 0,
    max_range: 5,
    damage: 3,
  },
  destroyer: {
    pa: 3,
    fire_cost: 3,
    fire_pattern: 'circular',
    min_range: 3,
    max_range: 5,
    damage: 5,
  },
}

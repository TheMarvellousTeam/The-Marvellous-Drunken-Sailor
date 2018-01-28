export const SRV_AD =
//  'https://the-marvelous-pirate-warship-server.now.sh' ||
  'http://localhost:8088'

export const SHIP_SPEC = {
  scout: {
    pa: 5,
    fire_cost: 2,
    min_range: 1,
    max_range: 3,
    damage: 1,
  },
  heavy: {
    pa: 3,
    fire_cost: 2,
    min_range: 3,
    max_range: 4,
    damage: 3,
  },
  destroyer: {
    pa: 3,
    fire_cost: 3,
    min_range: 2,
    max_range: 5,
    damage: 5,
  },
}

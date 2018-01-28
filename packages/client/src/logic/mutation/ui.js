export const onSelectShip = (_, state, shipId) => {
  state.selectedShip = shipId
  state.selectedTool = shipId && state.selectedTool
}

export const onSelectTool = (_, state, toolName) => {
  state.selectedTool = toolName
}

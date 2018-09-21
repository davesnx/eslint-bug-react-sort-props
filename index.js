import React, { Component } from 'react'
import PropTypes from 'prop-types'

const PictureChoice = () => {
  return (
    <List
      className={className}
      onStageAnswer={onStageAnswer}
      onCommitAnswer={onCommitAnswer}
      isFocused={isFocused}
      direction={direction}
      allowMultipleSelection={allowMultipleSelection}
      measureLongestChildNode={measureLongestChildNode}
      layoutItemsSize={layoutItemsSize}
      handleAppScroll={handleAppScroll}
      isActive={isActive}
      resetSelection={resetSelection}
      onKeyboardChoiceHovered={onKeyboardChoiceHovered}
      keyboardShortcutType
    />
  )
}

export default PictureChoice

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Choice } from '../block-components/molecules'
import { List, OtherChoice } from '../block-components/organisms'
import CommitButton from '../../containers/CommitButtonContainer'
import BlockWrapper from '../../containers/BlockWrapperContainer'
import { BlockHint } from '../block-components/atoms'
import cssSupport from '../../utils/CSSSupport'
import noop from '../../utils/noop'
import { LETTER } from '../../constants/keyboardShortcutTypes'
import DISPLAYS from '../../constants/ListDisplays'

import COMMIT_SCROLL_DELAY from '../../constants/scrollDelay'

class PictureChoice extends Component {
  constructor (props) {
    super(props)

    this.handleStageAnswer = this.handleStageAnswer.bind(this)
    this.handleOtherChoiceAnswer = this.handleOtherChoiceAnswer.bind(this)
    this.handleCommitAnswer = this.handleCommitAnswer.bind(this)
    this.handleKeyboardChoiceChange = this.handleKeyboardChoiceChange.bind(this)
    this.otherChoiceValue = ''
    this.supportsGrid = cssSupport(DISPLAYS.GRID)
  }

  componentDidUpdate (prevProps) {
    if (this.props.isActive) {
      this.handleBlockCentering(prevProps)
    }
  }

  handleBlockCentering (prevProps) {
    if (prevProps.choices.length !== this.props.choices.length) {
      this.props.scrollTo(this.props.blockRef)
    }
  }

  handleOtherChoiceAnswer (value) {
    this.otherChoiceValue = value
  }

  getOtherChoiceRef () {
    return this.props.blockRef + '-other'
  }

  handleKeyboardChoiceChange (index) {
    if (this.props.isActive) {
      let choiceRef
      if (index === this.props.choices.length) {
        choiceRef = this.getOtherChoiceRef()
      } else if (index >= 0 && index < this.props.choices.length) {
        choiceRef = this.props.choices[index].ref
      } else {
        return
      }

      this.props.scrollToChoice(choiceRef)
    }
  }

  handleStageAnswer (answersIndexes) {
    const {
      choices,
      blockRef,
      onStageAnswer,
      allowMultipleSelection,
      allowOtherChoice,
      t
    } = this.props
    onStageAnswer(
      blockRef,
      answersIndexes.map(index => {
        if (choices[index]) {
          return {
            ...choices[index],
            label: t(choices[index].label)
          }
        }

        if (allowOtherChoice && index === choices.length) {
          return this.otherChoiceValue
        }

        return {}
      })
    )

    if (!allowMultipleSelection && answersIndexes.length) {
      this.handleCommitAnswer()
    }
  }

  handleCommitAnswer () {
    setTimeout(() => {
      if (this.props.isActive) {
        this.props.onCommitAnswer(this.props.blockRef)
      }
    }, COMMIT_SCROLL_DELAY)
  }

  render () {
    const {
      allowMultipleSelection,
      allowOtherChoice,
      choices,
      isActive,
      index,
      isCommitButtonVisible,
      isFocused,
      display,
      showLabels,
      supersized,
      isPicture,
      verticalAlignment,
      layoutItemsSize,
      handleAppScroll,
      keyboardShortcutType,
      title,
      t
    } = this.props

    const wrapperClass = classNames(
      'stkv-c-block-multiple-choice',
      'stkv-us-secondary-color',
      'stkv-c-block__ui',
      {
        'stkv-c-block-multiple-choice--multiple-selection': allowMultipleSelection
      }
    )

    const isDisplayGrid = display === DISPLAYS.GRID
    const listClass = classNames({
      'stkv-c-grid': isDisplayGrid && this.supportsGrid,
      'stkv-c-grid--supersized':
        isDisplayGrid && this.supportsGrid && supersized,
      'stkv-c-grid--fallback': isDisplayGrid && !this.supportsGrid,
      'stkv-c-column': !isDisplayGrid && verticalAlignment,
      'stkv-c-row': !isDisplayGrid && !verticalAlignment
    })

    const blockWrapperProps = {
      ...this.props,
      title: {
        text: title,
        type: 'legend'
      }
    }

    return (
      <BlockWrapper
        {...blockWrapperProps}
        semantics={{ groupChildInputs: true }}
      >
        {choices && (
          <div className={wrapperClass}>
            {allowMultipleSelection && (
              <BlockHint hint='block.multipleChoice.hint' />
            )}
            <List
              allowMultipleSelection={allowMultipleSelection}
              className={listClass}
              direction={display}
              handleAppScroll={handleAppScroll}handleAppScroll={handleAppScroll}handleAppScroll={handleAppScrhandleAppScrollion={dispisActisActive={isActi
              layoutItems

              layoutItems
              layoutItemsSize={layoutItemsSize}
              handleAppScroll={handleAppScroll}
              isActive={isActive}
              resetSelection={this.props.shouldClearInput}
              onKeyboardChoiceHovered={this.handleKeyboardChoiceChange}
              keyboardShortcutType={keyboardShortcutType || LETTER}
            >
              {choices.map((choice, i) => (
                <Choice
                  choiceRef={choice.ref}
                  inlineDisplay={!verticalAlignment}
                  isPicture={isPicture}
                  key={`${index}-${i}`}
                  listName={`list-${index}`}
                  position={i}
                  showLabels={showLabels}
                  supersized={supersized}
                  value={t(choice.label)}
                  {...choice.attachment}
                />
              ))}
              {allowOtherChoice && (
                <OtherChoice
                  baseLabel={t('block.multipleChoice.other')}
                  choiceRef={this.getOtherChoiceRef()}
                  inlineDisplay={!verticalAlignment}
                  isPicture={isPicture}
                  listName={`list-${index}`}
                  onStageAnswer={this.handleOtherChoiceAnswer}
                  position={choices.length}
                  shouldResetValue={this.props.shouldClearInput}
                  supersized={supersized}
                />
              )}
            </List>
          </div>
        )}
        {allowMultipleSelection && (
          <CommitButton
            blockRef={this.props.blockRef}
            className='stkv-c-block-btn--spaced'
            layoutItemsSize={this.props.layoutItemsSize}
            onClick={this.handleCommitAnswer}
            useStickyFooter
            visible={isCommitButtonVisible}
          />
        )}
      </BlockWrapper>
    )
  }
}

PictureChoice.defaultProps = {
  onCommitAnswer: noop,
  onStageAnswer: noop,
  t: text => text,
  // For legal and Yes No blocks
  display: DISPLAYS.COLUMN,
  verticalAlignment: true
}

PictureChoice.propTypes = {
  allowMultipleSelection: PropTypes.bool,
  allowOtherChoice: PropTypes.bool,
  title: PropTypes.string,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isFocused: PropTypes.bool,
  isCommitButtonVisible: PropTypes.bool,
  blockRef: PropTypes.string,
  choices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      ref: PropTypes.string,
      label: PropTypes.string,
      attachment: PropTypes.shape({
        src: PropTypes.string
      })
    })
  ),
  onStageAnswer: PropTypes.func,
  onCommitAnswer: PropTypes.func,
  display: PropTypes.oneOf([DISPLAYS.COLUMN, DISPLAYS.GRID, DISPLAYS.ROW]),
  showLabels: PropTypes.bool,
  supersized: PropTypes.bool,
  isPicture: PropTypes.bool,
  verticalAlignment: PropTypes.bool,
  layoutItemsSize: PropTypes.object,
  handleAppScroll: PropTypes.func,
  scrollTo: PropTypes.func,
  scrollToChoice: PropTypes.func,
  t: PropTypes.func,
  shouldClearInput: PropTypes.bool,
  keyboardShortcutType: PropTypes.string
}

export default PictureChoice

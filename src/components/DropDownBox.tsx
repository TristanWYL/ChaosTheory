import { Fragment, useRef, useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { IndexUpdater } from '../misc/types'

const DropDownBox = ({
    options,
    indexUpdator,
    currentIndex = 0,
}: {
    options: Array<string>
    indexUpdator: IndexUpdater
    currentIndex?: number
}) => {
    const [selectedIndex, setSelectedIndex] = useState(currentIndex)
    const [open, setOpen] = useState(false)
    const anchorRef = useRef<HTMLDivElement>(null)
    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number
    ) => {
        if (selectedIndex !== index) {
            setSelectedIndex(index)
            indexUpdator(index)
        }
        setOpen(false)
    }
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }
    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return
        }
        setOpen(false)
    }
    return (
        <Fragment>
            <ButtonGroup
                variant="contained"
                ref={anchorRef}
                aria-label="split button"
            >
                <Button onClick={() => {}}>{options[selectedIndex]}</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom'
                                    ? 'center top'
                                    : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <div
                                    style={{
                                        maxHeight: '250px',
                                        overflow: 'auto',
                                    }}
                                >
                                    <MenuList
                                        id="split-button-menu"
                                        autoFocusItem
                                    >
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                // disabled={index === 2}
                                                selected={
                                                    index === selectedIndex
                                                }
                                                onClick={(event) =>
                                                    handleMenuItemClick(
                                                        event,
                                                        index
                                                    )
                                                }
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </div>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment>
    )
}

export default DropDownBox

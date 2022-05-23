import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import AdbIcon from '@mui/icons-material/Adb'

const HeaderBar = () => {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon
                        sx={{
                            mr: 1,
                        }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#"
                        sx={{
                            mr: 2,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CHAOS THEORY
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            paddingLeft: '50px',
                        }}
                    >
                        <Link
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                padding: '5px',
                            }}
                            to="/history"
                        >
                            History
                        </Link>
                        <Link
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                padding: '5px',
                            }}
                            to="/average"
                        >
                            Average
                        </Link>
                        <Link
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                padding: '5px',
                            }}
                            to="/latest"
                        >
                            Latest
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default HeaderBar

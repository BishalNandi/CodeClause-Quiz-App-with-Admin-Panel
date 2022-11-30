import React from 'react'
import Image from "next/image"

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import Logo from '../../assets/images/logo2.png';
import { AuthContext } from '../contexts/authContext';
import Link from 'next/link';

const pages = ['Products', 'Pricing', 'Blog'];

export default function Header(props) {
    const auth = React.useContext(AuthContext);

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const [sideBarState, setSideBarState] = React.useState({
        isOpen: false,
        anchor: "right"
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setSideBarState({ ...sideBarState, isOpen: open, anchor });
    };

    return (
        <AppBar position="static" sx={{
            bgcolor: "background.secondary",
            boxShadow: "none",
            borderBottom: "2px solid",
            borderColor: "border.default",
            position: props.sticky ? "sticky" : "relative",
            top: 0,
            zIndex: 999,
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Link href="/" style={{
                        textDecoration: "none",
                    }}>
                        <Box sx={{
                            display: { xs: 'none', md: 'flex' },
                            mr: 1,
                            alignItems: "center",
                            textDecoration: "none",
                        }}>
                            <Image
                                src={Logo}
                                alt="Logo"
                                height={30}
                                width={30}
                            />

                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    ml: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    fontSize: "1.7em",
                                    letterSpacing: '.1rem',
                                    color: 'text.primary',
                                    textDecoration: 'none',
                                }}
                            >
                                <span style={{ color: "#48e0ba", textDecoration: "none", }}>CODE</span>CLAUSE
                            </Typography>
                        </Box>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{
                        display: { xs: 'flex', md: 'none' },
                        mr: 1,
                        alignItems: "center",
                        flexGrow: 1,
                    }}>
                        <Link href="/" style={{
                            display: 'flex',
                            mr: 1,
                            alignItems: "center",
                            textDecoration: "none",
                            flexGrow: 1,
                        }}>
                            <Image
                                src={Logo}
                                alt="Logo"
                                height={25}
                                width={25}
                            />

                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    ml: 1,
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    fontSize: "1.3em",
                                    letterSpacing: '.1rem',
                                    color: 'text.primary',
                                    textDecoration: 'none',
                                }}
                            >
                                <span style={{ color: "#48e0ba" }}>CODE</span>CLAUSE
                            </Typography>
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={toggleDrawer("right", true)} sx={{ p: 0 }}>
                                <Chip
                                    avatar={<Avatar alt={auth.isAuthenticated ? auth.user.name : "Google"} src={auth.isAuthenticated ? auth.user.avatar : ""} imgProps={{
                                        referrerPolicy: 'no-referrer',
                                    }} />}
                                    label={auth.user.name}
                                    variant="outlined"
                                    sx={{
                                        cursor: "pointer"
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Drawer
                        anchor={sideBarState.anchor}
                        open={sideBarState.isOpen}
                        onClose={toggleDrawer("right", false)}
                        BackdropProps={{
                            invisible: false,
                        }}
                        SlideProps={{
                            sx: {
                                backgroundColor: 'background.default !important',
                                backgroundImage: 'none !important',
                                border: "2px solid",
                                borderColor: 'border.default',
                                borderRadius: '15px 0 0 15px',
                                width: '100%',
                                maxWidth: '350px',
                            }
                        }}
                    >
                        <SideBar onClose={toggleDrawer("right", false)} extraContent={props.sideBarContent} />
                    </Drawer>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

const SideBar = (Props) => {

    // const theme = useTheme();
    // const colorMode = React.useContext(ColorModeContext);
    const auth = React.useContext(AuthContext);
    // const globalContext = React.useContext(GlobalContext);

    return (
        <Box
            sx={{
                minHeight: '100%',
                height: 'auto',
                width: '100%',
                maxWidth: '400px',
                backgroundColor: 'background.default',
                color: 'text.primary',
                padding: '1rem',
            }}
        >
            {/* Top Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: '500',
                        fontSize: '1.1rem',
                    }}
                >Profile</Typography>
                <IconButton
                    onClick={Props.onClose}
                    sx={{
                        ml: 'auto',
                    }}
                >
                    <CloseIcon sx={{
                        color: "text.primary"
                    }} />
                </IconButton>
            </Box>

            <Divider sx={{
                borderColor: "border.secondary",
            }} />

            {/* Body */}
            <Box sx={{
                py: '1rem',
            }}>

                {/* Profile */}
                <Box sx={{
                    pb: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>

                    {auth.isAuthenticated ?
                        <>
                            <Avatar
                                alt={auth.user.name}
                                src={auth.user.avatar}
                                sx={{ width: 128, height: 128 }}
                            />
                            <Typography variant='h6' sx={{
                                fontWeight: '500',
                                fontSize: '1.5rem',
                            }}>{auth.user.name}</Typography>
                            <Typography variant='h6' sx={{
                                fontWeight: '500',
                                fontSize: '.75rem',
                                color: 'text.secondary',
                                mb: '.5rem',
                            }}>{auth.user.email}</Typography>

                            <GoogleButton isDisabled={false} onClick={auth.logout} text="Logout" />
                        </>
                        :
                        <>
                            <GoogleButton isDisabled={auth.isLoginDisabled} onClick={auth.login} text="Login With Google" />
                        </>
                    }

                </Box>

                <Divider sx={{
                    borderColor: "border.secondary",
                }} />

                <Box sx={{
                    py: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: "1rem"
                }}>

                    <Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Create A New Quiz">
                                <Link href="/create" style={{
                                    textDecoration: 'none',
                                }}>
                                    <Button variant="outlined" color="inherit" startIcon={<AddIcon />} sx={{
                                        color: '#fff'
                                    }}>
                                        Create Quiz
                                    </Button>
                                </Link>
                            </Tooltip>
                        </Box>
                    </Box>

                    <Box sx={{
                        width: "100%",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        gap: ".5rem"
                    }}>
                        {auth.user?.my_quizes?.map((quiz, index) =>
                            <Box key={index} sx={{
                                position: "relative",
                                width: "100%",
                                borderColor: "border.secondary",
                                border: "1px solid",
                                borderRadius: "5px",
                                py: 1,
                                px: 2,
                                pr: "40px",
                            }}>
                                <Typography
                                    variant="h6"
                                    component="h2"
                                    sx={{
                                        fontSize: "1em",
                                        height: "25px",
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 1,
                                    }}
                                >
                                    {quiz.title}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    component="p"
                                    sx={{
                                        fontSize: "0.8em",
                                        height: "41px",
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2,
                                    }}
                                >
                                    {quiz.description}
                                </Typography>

                                <Box sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    width: "40px",
                                    height: "100%",
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

                                    <Tooltip title="Open Link In New Tab">
                                        <Link href={`/${auth.user?.id}/${quiz.id}`} target="_blank" style={{
                                            textDecoration: 'none',
                                            width: "100%"
                                        }}>
                                            <IconButton aria-label="open" color="inherit">
                                                <OpenInNewIcon />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>

                                    <Tooltip title="Admin Panel">
                                        <Link href={`/${auth.user?.id}/${quiz.id}/admin`} target="_blank" style={{
                                            textDecoration: 'none',
                                            width: "100%"
                                        }}>
                                            <IconButton aria-label="admin" color="inherit">
                                                <AdminPanelSettingsIcon />
                                            </IconButton>
                                        </Link>
                                    </Tooltip>

                                </Box>
                            </Box>
                        )}
                    </Box>

                </Box>

            </Box>
        </Box>
    )
}

const GoogleButton = Props => {

    return (
        <Button sx={{
            bgcolor: '#4285f4',
            height: '43px',
            p: '0',
            border: '2px solid transparent',
            '&:hover': {
                bgcolor: '#3c78d8',
            },
            '&:disabled': {
                opacity: 0.6
            },
        }} disabled={Props.isDisabled} onClick={Props.onClick}>
            <Box fullwidth="true" sx={{
                height: '39px',
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
            }}>
                <Box sx={{
                    height: '39px',
                    width: '39px',
                    backgroundColor: "#fff",
                    borderRadius: "4px"
                }}>
                    <G_Icon style={{
                        height: '39px',
                        width: '39px',
                    }} />
                </Box>
                <Box sx={{
                    flexGrow: '1',
                    display: 'grid',
                    placeItems: 'center',
                    p: '2px',
                    px: '8px',
                }}>
                    <Typography variant='h6' sx={{
                        fontWeight: '600',
                        fontSize: '14px',
                        color: '#fff',
                    }}>
                        {Props.text}
                    </Typography>
                </Box>
            </Box>
        </Button>
    )
}

function G_Icon(props) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width="96" height="96"
            viewBox="0 0 48 48"
            style={{ fill: "#000000" }} {...props}>
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z">
            </path>
        </svg>
    )
}

import React from 'react'
import Image from "next/image"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';

import Logo from '../../assets/images/logo2.png';

export default function Loader(props) {
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: 999999,
            backgroundColor: "#0f111a",
            color: "#fff",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5em"
            }}>
                <Box sx={{
                    display: "flex",
                    mr: 1,
                    alignItems: "center",
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
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            ml: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            fontSize: "1.7em",
                            letterSpacing: '.1rem',
                            color: '#fff',
                            textDecoration: 'none',
                        }}
                    >
                        <span style={{ color: "#48e0ba" }}>CODE</span>CLAUSE
                    </Typography>
                </Box>

                <LinearProgress color="info" sx={{
                    width: "calc(100% - 40px)",
                    backgroundColor: "#98c1d717",
                    '& span' : {
                        backgroundColor: "#48e0ba"
                    }
                }} />
            </Box>
        </Box>
    )
}

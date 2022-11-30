import Head from 'next/head'
import Image from 'next/image'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Header from '../src/components/header';
import Footer from '../src/components/footer';

import BG from "../assets/images/slide-1.jpg";

export default function Home(props) {

    return (
        <Box sx={{
            position: "relative",
            width: "100%",
            maxWidth: "100%",
            minHeight: "100%",
            bgcolor: "background.paper",
            color: "text.primary",
            p: 0,
            m: 0,
        }}>

            <Header sticky />

            <Box component="main" sx={{

            }}>

                <Box sx={{
                    position: "relative",
                    width: "100%",
                    px: "1rem",
                    py: "1.5rem",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "stretch",
                    justifyContent: "center",
                    gap: "20px",
                    zIndex: 1,
                }}>

                    <Image
                        src={BG}
                        layout="fill"
                        objectFit='cover'
                        style={{
                            zIndex: "-1"
                        }}
                    />

                    <Box sx={{
                        width: "350px",
                        py: 2,
                        px: 2,
                        backgroundColor: "#1e1e1ea1",
                        borderRadius: "20px",
                        backdropFilter: "blur(2px)"
                    }}>
                        <Typography
                            variant='h6'
                            component='h1'
                            sx={{
                                fontSize: "1.3em"
                            }}
                        >Build, host and play amazing quizzes in minutes</Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{
                                fontSize: "1.1em",
                                fontWeight: 400,
                            }}
                        >Enjoy online, interactive quizzing with friends and family</Typography>
                    </Box>

                    <Box sx={{
                        width: "350px",
                        py: 2,
                        px: 2,
                        backgroundColor: "#1e1e1ea1",
                        borderRadius: "20px",
                        backdropFilter: "blur(2px)"
                    }}>
                        <Typography
                            variant='h6'
                            component='h1'
                            sx={{
                                fontSize: "1.3em"
                            }}
                        >Intuitive Quiz Builder</Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{
                                fontSize: "1.1em",
                                fontWeight: 400,
                            }}
                        >Make unlimited customizable quiz, share the link with anyone and get quiz on.</Typography>
                    </Box>

                    <Box sx={{
                        width: "350px",
                        py: 2,
                        px: 2,
                        backgroundColor: "#1e1e1ea1",
                        borderRadius: "20px",
                        backdropFilter: "blur(2px)"
                    }}>
                        <Typography
                            variant='h6'
                            component='h1'
                            sx={{
                                fontSize: "1.3em"
                            }}
                        >Access the admin panel to edit the quiz.</Typography>
                        <Typography
                            variant='h6'
                            component='p'
                            sx={{
                                fontSize: "1.1em",
                                fontWeight: 400,
                            }}
                        >Set timer of quiz and score of each questions manually which makes the experience more next level</Typography>
                    </Box>
                </Box>

            </Box>

            <Footer />

        </Box>
    )
}

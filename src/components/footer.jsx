import React from 'react'

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer(props) {
    return (
        <Box sx={{
            width: "100%",
            position: "relative",
        }} component="footer">

            {/* Top */}
            <Box sx={{
                width: "100%",
                backgroundColor: "#1e1e1e",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                px: "2.5rem",
                py: "2rem"
            }}>

                <Box sx={{
                    marginBottom: "30px",
                    flex: "0 0 auto",
                    width: {
                        xs: "100%",
                        sm: "50%",
                        md: "25%"
                    },
                    pr: 2
                }}>
                    <Typography
                        variant='h6'
                        component='h2'
                        sx={{
                            fontSize: "1.5em"
                        }}
                    >COMPANY</Typography>

                    <Typography
                        variant="p"
                        component="p"
                        sx={{
                            fontSize: "0.9em",
                            fontWeight: 400,
                            color: "rgb(255 255 255 / 70%)"
                        }}
                    >401, Shreenath Complex<br />
                        4th Floor, Near Polyhub FoodCourt<br />
                        Vadgaon Pune, India</Typography>

                    <br />

                    <Typography
                        variant="p"
                        component="p"
                        sx={{
                            fontSize: "0.9em",
                            fontWeight: 400,
                            color: "rgb(255 255 255 / 70%)"
                        }}
                    >
                        <strong>Phone:</strong> +91 7030020973
                        <br />
                        <strong>Email:</strong> official@codeclause.com
                    </Typography>
                </Box>

                <Box sx={{
                    marginBottom: "30px",
                    flex: "0 0 auto",
                    width: {
                        xs: "100%",
                        sm: "50%",
                        md: "25%"
                    },

                    '& ul': {
                        listStyle: "none",

                        '& li': {
                            padding: "10px 0",
                            display: "flex",
                            alignItems: "center",

                            '& a': {
                                color: "rgba(255, 255, 255, 0.6)",
                                transition: "0.3s",
                                display: "inline-block",
                                lineHeight: "1",
                                textDecoration: "none",
                            },

                            '&:before': {
                                content: '"›"',
                                fontSize: "1.5em",
                                mr: 1,
                                color: "#1ed33c",
                                lineHeight: "1"
                            }
                        }
                    }
                }}>
                    <Typography
                        variant='h6'
                        component='h2'
                        sx={{
                            fontSize: "1.2em"
                        }}
                    >Useful Links</Typography>

                    <ul>
                        <li><a href="https://codeclause.com/" target="_blank" rel="noreferrer">Home</a></li>
                        <li><a href="https://codeclause.com/About" target="_blank" rel="noreferrer">About us</a></li>
                        <li><a href="https://codeclause.com/Services" target="_blank" rel="noreferrer">Services</a></li>
                        <li><a href="https://codeclause.com/Careers" target="_blank" rel="noreferrer">Careers</a></li>
                        <li><a href="https://internship.codeclause.com" target="_blank" rel="noreferrer">Internship Program</a></li>
                    </ul>
                </Box>

                <Box sx={{
                    marginBottom: "30px",
                    flex: "0 0 auto",
                    width: {
                        xs: "100%",
                        sm: "50%",
                        md: "25%"
                    },

                    '& ul': {
                        listStyle: "none",

                        '& li': {
                            padding: "10px 0",
                            display: "flex",
                            alignItems: "center",

                            '& a': {
                                color: "rgba(255, 255, 255, 0.6)",
                                transition: "0.3s",
                                display: "inline-block",
                                lineHeight: "1",
                                textDecoration: "none",
                            },

                            '&:before': {
                                content: '"›"',
                                fontSize: "1.5em",
                                mr: 1,
                                color: "#1ed33c",
                                lineHeight: "1"
                            }
                        }
                    }
                }}>
                    <Typography
                        variant='h6'
                        component='h2'
                        sx={{
                            fontSize: "1.2em"
                        }}
                    >Our Services</Typography>

                    <ul>
                        <li><a href="https://codeclause.com/Services" target="_blank" rel="noreferrer">Internet of Things</a></li>
                        <li><a href="https://codeclause.com/Services" target="_blank" rel="noreferrer">Automation AI/ML</a></li>
                        <li><a href="https://codeclause.com/Services" target="_blank" rel="noreferrer">Software Development</a></li>
                        <li><a href="https://codeclause.com/Services" target="_blank" rel="noreferrer">Cloud</a></li>
                        <li><a href="https://codeclause.com/Services" target="_blank" rel="noreferrer">Graphic Design</a></li>
                    </ul>
                </Box>

                <Box sx={{
                    marginBottom: "30px",
                    flex: "0 0 auto",
                    width: {
                        xs: "100%",
                        sm: "50%",
                        md: "25%"
                    },
                }}>
                    <Typography
                        variant='h6'
                        component='h2'
                        sx={{
                            fontSize: "1.2em"
                        }}
                    >Join Our Internship Prorgam</Typography>

                    <Typography
                        variant="p"
                        component="p"
                        sx={{
                            fontSize: "0.9em",
                            fontWeight: 400
                        }}
                    >Join internship program and get certified by CodeClause.</Typography>

                    <a href="https://internship.codeclause.com" target="_blank" rel="noreferrer">
                        <input style={{
                            backgroundColor: "transparent",
                            borderColor: "#35F4C5",
                            color: "white"
                        }} type="submit" value="Join Program" />
                    </a>

                </Box>

            </Box>

            {/* Bottom */}
            <Box sx={{
                width: "100%",
                backgroundColor: "#111111",
                display: { xs: "block", sm: "flex" },
                flexWrap: "wrap",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                px: "2.5rem",
                py: "1.5rem"
            }}>
                <Box sx={{
                    mb: {
                        xs: "1.5rem",
                        sm: "0"
                    }
                }}>
                    <Typography
                        variant="p"
                        component="p"
                        sx={{
                            fontSize: "0.9em",
                            fontWeight: 400,
                            textAlign: {
                                xs: "center",
                                sm: "left"
                            }
                        }}
                    >© Copyright <strong>CodeClause</strong>. All Rights Reserved</Typography>
                    <Typography
                        variant="h6"
                        component="p"
                        sx={{
                            fontSize: "0.9em",
                            fontWeight: 400,
                            textAlign: {
                                xs: "center",
                                sm: "left"
                            }
                        }}
                    >Designed by <a href="https://codeclause.com/" target="_blank" rel="noreferrer" style={{
                        color: "#48DFBA",
                        textDecoration: "none"
                    }}>Bishal Nandi</a></Typography>
                </Box>

                <Box sx={{
                    display: {
                        xs: "flex",
                        sm: "block"
                    },
                    justifyContent: "center",

                    '& a': {
                        fontSize: "18px",
                        display: "inline-grid",
                        placeItems: "center",
                        background: "rgba(255, 255, 255, 0.08)",
                        color: "#fff",
                        lineHeight: "1",
                        padding: "8px 0",
                        marginRight: "4px",
                        borderRadius: "4px",
                        textAlign: "center",
                        width: "36px",
                        height: "36px",
                        transition: "0.3s",

                        '&:hover': {
                            background: "#48DFBA",
                            color: "#fff",
                            textDecoration: "none",
                        }
                    }
                }}>
                    <a href='https://wa.me/917030020973?text=' target="_blank" rel="noreferrer">
                        <WhatsAppIcon />
                    </a>
                    <a href='https://www.facebook.com/people/Code-Clause/100080154861285/' target="_blank" rel="noreferrer">
                        <FacebookIcon />
                    </a>
                    <a href='https://www.instagram.com/codeclause/' target="_blank" rel="noreferrer">
                        <InstagramIcon />
                    </a>
                    <a href='https://www.linkedin.com/company/codeclause/' target="_blank" rel="noreferrer">
                        <LinkedInIcon />
                    </a>
                </Box>
            </Box>

        </Box >
    )
}

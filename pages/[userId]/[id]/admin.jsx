import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import SwipeableViews from 'react-swipeable-views';

import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import EditIcon from '@mui/icons-material/Edit';
import MonitorIcon from '@mui/icons-material/Monitor';

import Header from '../../../src/components/header'
import { AuthContext } from '../../../src/contexts/authContext';
import Banner from "../../../assets/images/banner.png";
import CreateQuestionsList from '../../../src/components/CreateQuestionsList';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function Admin(props) {

    const Router = useRouter();
    const theme = useTheme();
    const auth = React.useContext(AuthContext);

    const [tab, setTab] = React.useState(0);
    const [data, setData] = React.useState({});

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleChangeIndex = (index) => {
        setTab(index);
    };

    React.useEffect(() => {
        if (!Router.isReady) return;

        async function getData() {
            const res = await axios.post("/api/base/edit", {
                query: "get",
                userId: Router.query.userId,
                quizId: Router.query.id,
            });

            setData(res.data?.data);
        }

        getData();

    }, [Router.isReady]);

    return auth.isAuthenticated ? (
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

            <Header />

            <Box sx={{
                display: "flex",
                alignItems: "center",
                zIndex: 1000,
                bgcolor: "background.secondary",
                py: 1,
                px: 2,
                gap: "10px",
                justifyContent: "center",
            }}>

                <Tabs
                    value={tab}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    sx={{
                        "& .MuiTabs-indicator": {
                            backgroundColor: "rgb(72 224 186)",
                        }
                    }}
                >
                    <Tab label="Edit" {...a11yProps(0)} />
                    <Tab label="Monitize" {...a11yProps(1)} />
                </Tabs>

            </Box>

            <Box sx={{
                position: "relative",
                width: "100%",
                py: 2,
            }}>

                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={tab}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={tab} index={0} dir={theme.direction}>
                        <Box sx={{
                            width: "100%",
                            maxWidth: 770,
                            px: 2,
                            mx: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}>

                            {/* Banner */}
                            <Box sx={{
                                width: "100%",
                                aspectRatio: "5",
                                overflow: "hidden",
                                position: "relative",
                                borderRadius: "15px"
                            }}>
                                <Image
                                    src={Banner}
                                    alt="banner"
                                    layout='fill'
                                />
                            </Box>

                            {/* Title */}
                            <Box sx={{
                                width: "100%",
                                backgroundColor: "background.secondary",
                                position: "relative",
                                borderRadius: "15px",
                                py: 2,
                                px: 2,
                            }}>
                                <TextField
                                    id="title"
                                    label="Title"
                                    variant="standard"
                                    sx={{
                                        width: "100%",
                                        color: "#fff",
                                        fontSize: "100px",
                                        '& > div::before': {
                                            borderColor: "#aaa",
                                        },
                                        '& > div::after': {
                                            borderColor: "#90caf9",
                                        },
                                        '& > label.Mui-focused': {
                                            color: "#90caf9"
                                        },
                                        mb: 2
                                    }}
                                    value={data.title || ""}
                                    onChange={e => setData({ ...data, title: e.target.value })}
                                />

                                <TextField
                                    id="description"
                                    label="Description"
                                    variant="standard"
                                    sx={{
                                        width: "100%",
                                        color: "#fff",
                                        fontSize: "100px",
                                        '& > div::before': {
                                            borderColor: "#aaa",
                                        },
                                        '& > div::after': {
                                            borderColor: "#90caf9",
                                        },
                                        '& > label.Mui-focused': {
                                            color: "#90caf9"
                                        },
                                    }}
                                    value={data.description || ""}
                                    multiline
                                    onChange={e => setData({ ...data, description: e.target.value })}
                                />
                            </Box>

                            <CreateQuestionsList data={data} setData={setData} editing />

                        </Box>
                    </TabPanel>

                    <TabPanel value={tab} index={1} dir={theme.direction}>
                        <Box sx={{
                            width: "100%",
                            maxWidth: 770,
                            px: 2,
                            mx: "auto",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                        }}>

                            {/* Banner */}
                            <Box sx={{
                                width: "100%",
                                aspectRatio: "5",
                                overflow: "hidden",
                                position: "relative",
                                borderRadius: "15px"
                            }}>
                                <Image
                                    src={Banner}
                                    alt="banner"
                                    layout='fill'
                                />
                            </Box>

                            {data?.participents?.map((p, i) =>
                                <Box key={i} sx={{
                                    width: "100%",
                                    backgroundColor: "background.secondary",
                                    position: "relative",
                                    borderRadius: "15px",
                                    py: 2,
                                    px: 2,
                                }}>
                                    <Data participent={p} data={data} />
                                </Box>
                            )}

                        </Box>
                    </TabPanel>
                </SwipeableViews>
            </Box>
        </Box>
    ) : <Box sx={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        minHeight: "100%",
        bgcolor: "background.paper",
        color: "text.primary",
        p: 0,
        m: 0,
    }}>

        <Header />

        <Box sx={{
            width: "100%",
            height: "100%",
            minHeight: "100%",
            display: "grid",
            placeItems: "center",
            py: 5,
        }}>
            <Typography variant='h6' component="h6">
                You Need To Be Logged In To Create a Quiz
            </Typography>
        </Box>

    </Box>;
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function Data(props) {

    const Router = useRouter();
    const [userData, setUserData] = React.useState({});

    React.useEffect(() => {
        if (!Router.isReady) return;

        async function getUserData() {
            const res = await axios.post('/api/base/getData', {
                userId: Router.query.userId,
                quizId: Router.query.id,
                sub: props.participent?.sub
            });

            setUserData(res.data);
        }

        getUserData();

    }, [Router.isReady]);

    return (
        <Box sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
        }}>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}>
                <Avatar
                    alt={userData?.participent?.name}
                    src={userData?.participent?.avatar}
                    sx={{ width: 96, height: 96 }}
                />
                <Typography variant='h6' sx={{
                    fontWeight: '500',
                    fontSize: '1.5rem',
                }}>{userData?.participent?.name}</Typography>
                <Typography variant='h6' sx={{
                    fontWeight: '500',
                    fontSize: '.75rem',
                    color: 'text.secondary',
                    mb: '.5rem',
                }}>{userData?.participent?.email}</Typography>
            </Box>

            <Box sx={{
                position: "relative",
                width: "100px",
                // height: "200px",
            }}>
                <CircularProgressbar
                    value={userData?.data?.totalCorrectAnswer || 0}
                    maxValue={userData?.totalQuestionsCount || 1}
                    strokeWidth={15}
                    text={`${((userData?.data?.totalCorrectAnswer || 0) / (userData?.totalQuestionsCount || 1) * 100).toFixed(1)}%`}
                // background="#0f111a"
                />
                <Typography
                    variant="h6"
                    component="h5"
                    sx={{
                        fontSize: "0.9em",
                        textAlign: "center",
                        mt: 2,
                        color: "rgb(72 224 186)"
                    }}
                >
                    Number Of Currect Answers ({userData?.data?.totalCorrectAnswer || 0}/{userData?.totalQuestionsCount || 1})
                </Typography>
            </Box>

            <Box sx={{
                position: "relative",
                width: "100px",
            }}>
                <CircularProgressbar
                    value={userData?.data?.scoreAcheived || 0}
                    maxValue={userData?.totalScore || 1}
                    strokeWidth={15}
                    text={`${((userData?.data?.scoreAcheived || 0) / ((userData?.totalScore || 1)) * 100).toFixed(1)}%`}
                // background="#0f111a"
                />
                <Typography
                    variant="h6"
                    component="h5"
                    sx={{
                        fontSize: "0.9em",
                        textAlign: "center",
                        mt: 2,
                        color: "rgb(72 224 186)"
                    }}
                >
                    Total Score Achieved ({userData?.data?.scoreAcheived || 0}/{userData?.totalScore || 1})
                </Typography>
            </Box>

        </Box>
    )
}


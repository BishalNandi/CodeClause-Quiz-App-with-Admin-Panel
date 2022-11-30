import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import ReplyIcon from '@mui/icons-material/Reply';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

import Header from '../../../src/components/header'
import { useRouter } from 'next/router';
import axios from 'axios';
import { GlobalContext } from '../../../src/contexts/globalContext';
import Loader from '../../../src/components/loader';

export default function Quiz(props) {

    const Router = useRouter();
    const globalContext = React.useContext(GlobalContext);

    const [loading, setLoading] = React.useState(true);
    const [loadingTime, setLoadingTime] = React.useState(new Date().getTime());
    const [data, setData] = React.useState({});
    const [time, setTime] = React.useState(0);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    async function handel(skip = true) {
        try {
            if (!skip && (selectedIndex === -1)) {
                globalContext.showSnackBar("Please Select An Option", {
                    variant: 'error',
                    transition: 'slideRight',
                });
                return false;
            }

            const res = await axios.post('/api/base/check', {
                userId: Router.query.userId,
                quizId: Router.query.id,
                skip: skip,
                selectedIndex,
            })
            const data = res.data;
            setData(data);
            setSelectedIndex(-1);
            setTime(data.currentQuestion?.time);

            const currentTime = new Date().getTime();
            if ((loadingTime + 2000) < currentTime) {
                setLoading(false);
            } else {
                setTimeout(() => setLoading(false), (loadingTime + 2000) - currentTime);
            }

        } catch (err) {
            globalContext.showSnackBar(err.message, {
                variant: 'error',
                transition: 'slideRight',
            });
            Router.push("/");
        }
    }

    React.useEffect(() => {
        const warningText = 'You have unsaved changes - are you sure you wish to leave this page?';

        function handelWindowClose(e) {
            if (data.quizEnd) return;
            e.preventDefault();
            return (e.returnValue = warningText)
        }

        const handleBrowseAway = () => {
            if (data.quizEnd) return;
            if (window.confirm(warningText)) return
            Router.events.emit('routeChangeError')
            throw 'routeChange aborted.'
        }

        window.addEventListener('beforeunload', handelWindowClose);
        Router.events.on('routeChangeStart', handleBrowseAway)

        return () => {
            window.removeEventListener('beforeunload', handelWindowClose);
            Router.events.off('routeChangeStart', handleBrowseAway)
        }
    });

    React.useEffect(() => {
        if (!Router.isReady) return;

        let interval;
        if (time > 0) {
            interval = setInterval(() => {
                setTime(time - 1);
            }, 1000);
        } else {
            handel(true);
        }

        return () => {
            clearInterval(interval);
        }
    }, [time, Router.isReady]);

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

            <Header />

            {loading &&
                <Box sx={{
                    position: "absolute",
                    top: "66px",
                    left: 0,
                    width: "100%",
                    height: "100%",
                    minHeight: "calc(100% - 66px)",
                    maxHeight: "calc(100% - 66px)",
                    display: "grid",
                    placeItems: "center",
                    bgcolor: "background.primary",
                    zIndex: 999,
                }}>
                    <Loader />
                </Box>
            }

            <Box sx={{
                position: "relative",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                bgcolor: "background.secondary",
                py: 1,
                px: 2,
                gap: "10px"
            }}>

                {!data.quizEnd &&
                    <Box sx={{
                        bgcolor: "background.primary",
                        border: "1px solid",
                        borderColor: "border.default",
                        borderRadius: "5px",
                        py: "3px",
                        px: "8px",
                    }}>
                        {(Math.floor(time / 60)).toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false
                        })}:{(time - (Math.floor(time / 60) * 60)).toLocaleString('en-US', {
                            minimumIntegerDigits: 2,
                            useGrouping: false
                        })}
                    </Box>
                }
                <Box sx={{
                    bgcolor: "background.primary",
                    border: "1px solid",
                    borderColor: "border.default",
                    borderRadius: "5px",
                    py: "3px",
                    px: "8px",
                }}>
                    {!data.quizEnd ? `${data?.currentQuestion?.id}/${data.totalQuestionsCount}` : data.totalQuestionsCount} Questions
                </Box>

                <div style={{ flexGrow: 1 }}></div>

                {!data.quizEnd &&
                    <>
                        <Button variant="outlined" color="inherit" size="small" endIcon={<ReplyAllIcon />} sx={{
                            '& svg': {
                                transform: "scaleX(-1)"
                            }
                        }} onClick={e => handel(true)}>
                            Skip
                        </Button>
                        <Button variant="outlined" color="inherit" size="small" endIcon={<ReplyIcon />} sx={{
                            '& svg': {
                                transform: "scaleX(-1)"
                            }
                        }} onClick={e => handel(false)}>
                            Submit
                        </Button>
                    </>
                }
            </Box>

            <Box sx={{
                position: "relative",
                width: "100%",
                maxWidth: "770px",
                height: "auto",
                mx: "auto",
                px: 1,
                py: 2,
            }}>

                {/* Title */}
                <Box sx={{
                    width: "100%",
                    backgroundColor: "background.secondary",
                    position: "relative",
                    borderRadius: "15px",
                    border: "1px solid",
                    borderColor: "border.default",
                    borderTop: "5px solid rgb(72 224 186)",
                    py: 2,
                    px: 2,
                }}>

                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontSize: "1.3em",
                            height: "25px",
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                        }}
                    >
                        {data.title}
                    </Typography>

                    <Typography
                        variant="p"
                        component="p"
                        sx={{
                            mt: 1,
                            fontSize: "0.9em",
                        }}
                    >
                        {data.description}
                    </Typography>

                </Box>

                {/* Question */}
                <Box sx={{
                    position: "relative",
                    width: "100%",
                    backgroundColor: "background.secondary",
                    borderRadius: "15px",
                    border: "1px solid",
                    borderColor: "border.default",
                    borderTop: "5px solid rgb(72 224 186)",
                    py: 2,
                    px: 2,
                    mt: 2,
                }}>
                    {!data.quizEnd ?
                        <>
                            <Typography
                                variant="h6"
                                component="h2"
                                sx={{
                                    fontSize: "1em",
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "0.9em",
                                        color: "rgb(72 224 186)"
                                    }}
                                >Question {data?.currentQuestion?.id}: </span>
                                {data?.currentQuestion?.question}
                            </Typography>

                            <FormControl sx={{
                                width: "100%",
                                pl: 5,
                                pt: 2,
                            }}>
                                <FormLabel id="demo-radio-buttons-group-label" color='info' sx={{
                                    color: "rgb(72 224 186)",
                                    fontSize: "0.9em",
                                    '&.Mui-focused': {
                                        color: "rgb(72 224 186)",
                                    }
                                }}>Options (score: 1)</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={0}
                                    name="radio-buttons-group"
                                    value={selectedIndex}
                                    onChange={e => {
                                        setSelectedIndex(e.target.value);
                                    }}
                                >
                                    {data?.currentQuestion?.options?.map((option, index) =>
                                        <FormControlLabel
                                            key={index}
                                            value={index}
                                            control={<Radio color="default" />}
                                            label={option}
                                        />
                                    )}
                                </RadioGroup>
                            </FormControl>
                        </>
                        :
                        <>
                            <Box sx={{
                                width: "100%",
                                position: "relative",
                                display: "flex",
                                justifyContent: "space-around",
                            }}>

                                <Box sx={{
                                    position: "relative",
                                    width: "200px",
                                    // height: "200px",
                                }}>
                                    <CircularProgressbar
                                        value={data.data.totalCorrectAnswer}
                                        maxValue={data.totalQuestionsCount}
                                        strokeWidth={15}
                                        text={`${(data.data.totalCorrectAnswer / (data.totalQuestionsCount) * 100).toFixed(1)}%`}
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
                                        Number Of Currect Answers ({data.data.totalCorrectAnswer}/{data.totalQuestionsCount})
                                    </Typography>
                                </Box>

                                <Box sx={{
                                    position: "relative",
                                    width: "200px",
                                    height: "200px",
                                }}>
                                    <CircularProgressbar
                                        value={data.data.scoreAcheived}
                                        maxValue={data.totalScore}
                                        strokeWidth={15}
                                        text={`${(data.data.scoreAcheived / (data.totalScore) * 100).toFixed(1)}%`}
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
                                        Total Score Achieved ({data.data.scoreAcheived}/{data.totalScore})
                                    </Typography>
                                </Box>

                            </Box>
                        </>
                    }
                </Box>

            </Box>

        </Box>
    )
}

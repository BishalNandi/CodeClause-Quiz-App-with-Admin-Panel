import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PublishIcon from '@mui/icons-material/Publish';

import { GlobalContext } from '../contexts/globalContext';
import axios from 'axios';
import { AuthContext } from '../contexts/authContext';

export default function CreateQuestionsList(props) {

    const globalContext = React.useContext(GlobalContext);
    const authContext = React.useContext(AuthContext);
    const Router = useRouter();

    const [isBrowser, setIsBrowser] = React.useState(false);

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            setIsBrowser(true);
        }
    }, []);

    function handleOnDragEnd(result) {
        if (!result.destination) return;

        const items = Array.from(props.data?.questions);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        props.setData(data => ({ ...data, questions: items }));
    }

    async function publishHandel(e) {
        try {

            const res = await axios.post(props.editing ? "/api/base/edit" : "/api/base/create", {
                data: props.data,
                userId: Router.query.userId,
                quizId: Router.query.id,
            });

            if ((res.status === 200) || (res.status === 201)) {
                authContext.refresh();
                !props.editing && Router.push(res.data?.data?.link);

                globalContext.showSnackBar(res.data.message, {
                    variant: 'success',
                    transition: 'slideRight',
                });
            }

        } catch (error) {
            globalContext.showSnackBar(error.message, {
                variant: 'error',
                transition: 'slideRight',
            });
        }
    }

    return isBrowser ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="questions">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        <Box sx={{
                            width: "100%",
                            p: 0,
                            m: 0,
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px"
                        }}
                        >

                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                position: "sticky",
                                top: 0,
                                zIndex: 1000,
                                bgcolor: "background.secondary",
                                py: 1,
                                px: 2,
                                borderRadius: "15px",
                                border: "1px solid",
                                borderColor: "#aaa",
                                gap: "10px"
                            }}>
                                <div style={{ flexGrow: 1 }}></div>

                                <Tooltip title="Publish This Quiz">
                                    <Button variant="outlined" size='small' color="success" startIcon={<PublishIcon />} onClick={publishHandel}>Publish</Button>
                                </Tooltip>

                                <Tooltip title="Add New Question">
                                    <Button variant="outlined" size='small' color="inherit" startIcon={<AddIcon />} onClick={e => {
                                        props.setData(data => ({
                                            ...data, questions: [...data.questions, {
                                                id: props.data?.questions?.length,
                                                question: "",
                                                type: "",
                                                score: 1,
                                                time: 60,
                                                options: [""],
                                                correctIndex: 0,
                                            }]
                                        }));
                                    }}>Add Question</Button>
                                </Tooltip>
                            </Box>

                            {props.data?.questions?.map(((q, index) =>
                                <Draggable
                                    key={`questions-${index + 1}`}
                                    draggableId={`questions-${index + 1}`}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                        // {...provided.dragHandleProps}
                                        >
                                            <Box
                                                sx={{
                                                    width: "100%",
                                                    backgroundColor: "background.secondary",
                                                    position: "relative",
                                                    borderRadius: "15px",
                                                    border: "1px solid",
                                                    borderColor: "border.default",
                                                    py: 2,
                                                    px: 2,
                                                    pl: "30px",
                                                    // '&::before': {
                                                    //     content: '":::"',
                                                    //     width: "20px",
                                                    //     height: "100%",
                                                    //     position: "absolute",
                                                    //     top: 0,
                                                    //     left: "5px",
                                                    //     cursor: "move",
                                                    //     writingMode: "vertical-rl",
                                                    //     textOrientation: "mixed",
                                                    //     display: "grid",
                                                    //     placeItems: "center",
                                                    //     textAlign: "right",
                                                    //     lineHeight: "20px",
                                                    //     fontWeight: 900,
                                                    //     fontSize: "1.4em"
                                                    // }
                                                }}
                                            >

                                                <div style={{
                                                    flexGrow: 0,
                                                    flexShrink: 0,
                                                    height: "100%",
                                                    width: "30px",
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }} {...provided.dragHandleProps}>
                                                    <DragIndicatorIcon />
                                                </div>

                                                <Item data={props.data?.questions[index]} setData={e => {
                                                    props.setData(data => ({
                                                        ...data,
                                                        questions: [
                                                            ...data.questions?.map((a, i) => i === index ? ({
                                                                ...a,
                                                                ...e
                                                            }) : a)
                                                        ]
                                                    }))
                                                }} />

                                                {/* Action */}
                                                <Box sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    flexWrap: "wrap",
                                                }}>
                                                    <TextField
                                                        id="score"
                                                        label="Score"
                                                        variant="standard"
                                                        type="number"
                                                        sx={{
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
                                                        value={props.data?.questions[index]?.score}
                                                        onChange={e => {
                                                            props.setData(data => ({
                                                                ...data,
                                                                questions: [
                                                                    ...data.questions?.map((a, i) => i === index ? ({
                                                                        ...a,
                                                                        score: parseInt(e.target.value)
                                                                    }) : a)
                                                                ]
                                                            }))
                                                        }}
                                                    />
                                                    <TextField
                                                        id="time"
                                                        label="Time (Seconds)"
                                                        variant="standard"
                                                        type="number"
                                                        sx={{
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
                                                        value={props.data?.questions[index]?.time}
                                                        onChange={e => {
                                                            props.setData(data => ({
                                                                ...data,
                                                                questions: [
                                                                    ...data.questions?.map((a, i) => i === index ? ({
                                                                        ...a,
                                                                        time: parseInt(e.target.value)
                                                                    }) : a)
                                                                ]
                                                            }))
                                                        }}
                                                    />

                                                    <div style={{ flexGrow: 1 }}></div>

                                                    <Tooltip title="Add New Option">
                                                        <Button variant="outlined" size='small' color="inherit" startIcon={<AddIcon />} onClick={e => {
                                                            props.setData(data => ({
                                                                ...data, questions: [
                                                                    ...data.questions.map((a, i) => i === index ? ({
                                                                        ...a,
                                                                        options: [
                                                                            ...a.options,
                                                                            ""
                                                                        ]
                                                                    }) : a)
                                                                ]
                                                            }));
                                                        }}>Add Option</Button>
                                                    </Tooltip>

                                                    <Tooltip title="Delete This Question">
                                                        <IconButton aria-label="delete" color="inherit" onClick={e => {
                                                            props.setData(data => ({ ...data, questions: [...data.questions?.filter((e, i) => i !== index)] }))
                                                        }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>

                                            </Box>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}

                        </Box>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
        :
        null
}

function Item(props) {
    return (
        <Box>
            <FormControl sx={{
                width: "100%"
            }}>
                {/* Items */}
                <TextField
                    id="question"
                    label="Question"
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
                    value={props.data?.question}
                    onChange={e => props.setData({ ...props.data, question: e.target.value })}
                />

                {/* Multiple Choice */}
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={props.data?.options[props.data?.correctIndex]}
                    onChange={e => {
                        props.setData({
                            ...props.data,
                            correctIndex: props.data?.options?.indexOf(e.target.value)
                        });
                    }}
                >
                    {props.data?.options?.map((a, i) => (
                        <Box key={i} sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                        }}>
                            <FormControlLabel value={props.data?.options[i]} control={<Radio color="default" />} />
                            <TextField
                                id="option"
                                label="Option"
                                variant="standard"
                                sx={{
                                    flexGrow: 1,
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
                                value={props.data?.options[i]}
                                onChange={e => props.setData({
                                    ...props.data, options: [
                                        ...props.data?.options?.map((a, ind) => (i === ind) ? e.target.value : a)
                                    ]
                                })}
                            />
                            <Tooltip title="Delete This Option">
                                <IconButton aria-label="delete" color="inherit" onClick={e => {
                                    props.setData({
                                        ...props.data,
                                        options: props.data.options.filter((e, ind) => (ind !== i))
                                    })
                                }}>
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    ))}
                </RadioGroup>
            </FormControl>
        </Box>
    )
}


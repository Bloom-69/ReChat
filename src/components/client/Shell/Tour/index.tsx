import { ArrowBack, ArrowForward } from "@suid/icons-material";
import { Container, Dialog, IconButton, Toolbar, Typography } from "@suid/material";
import { createSignal } from "solid-js";
import { Index } from "unist-util-visit";

import Selection1 from "./Selections/Selection 1";
import Selection2 from "./Selections/Selection 2";

import * as ReChat from "../../../../lib/ReChat"
import Selection3 from "./Selections/Selection 3";
import Selection4 from "./Selections/Selection 4";
import Selection5 from "./Selections/Selection 5";

const [tab, setTab] = createSignal<Index>(0);

const [disabledBack, setDisabledBack] = createSignal<boolean>(true);

const [disabledForward, setDisabledForward] = createSignal<boolean>(false);

function disableBack () {
    if (tab() === 0) {
        setDisabledBack(true)
    } else if (tab() > 0) {
        setDisabledBack(false)
    }
}

function disableForward () {
    if (tab() === 4) {
        setDisabledForward(true)
    } else if (tab() < 4) {
        setDisabledForward(false)
        setDisabledBack(false)
    }
}

export default function TourShell() {
    return <Dialog open={ReChat.settings.tour.show} fullScreen>
        <Container sx={{width: '100%', height: '95%'}}>
            {tab() === 0 && <Selection1 />}
            {tab() === 1 && <Selection2 />}
            {tab() === 2 && <Selection3 />}
            {tab() === 3 && <Selection4 />}
            {tab() === 4 && <Selection5 />}
        </Container>
        <Toolbar>
            <IconButton onClick={() => {
                if (tab() === 0)
                {
                    disableBack()
                } 
                
                else 
                {
                    setTab(tab() - 1)
                    disableForward()
                    disableBack()
                }
            }} color="inherit" disabled={disabledBack()}>
                <ArrowBack />
            </IconButton>
            <Typography sx={{mx: 'auto'}}>
                {tab}
            </Typography>
            <IconButton onClick={() => {
                if (tab() === 4)
                {
                    disableForward()
                } 

                else
                {
                    setTab(tab() + 1)
                    disableBack()
                    disableForward()
                }
            }} color="inherit" disabled={disabledForward()}>
                <ArrowForward />
            </IconButton>
        </Toolbar>
    </Dialog>
}
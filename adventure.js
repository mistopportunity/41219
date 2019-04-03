const paths = {
    start: {
        title: "choose your own birthday",
        text: "are you ready?",
        buttons: [
            {
                text: "yeah, sure",
                toPath: "adventureReady"
            },
            {
                text: "noplzimavirgin",
                toPath: "itWillBeFine"
            }
        ]
    },
    itWillBeFine: {
        text: "are you sure?",
        buttons: [
            {
                text: "yes, i'm sure",
                toPath: "pleaseJustTryIt"
            },
            {
                text: "okay.. let me decide again",
                toPath: "start"
            }
        ]
    },
    tooMuchPressure: {
        text: "too much pressure? what's 5 times 7,302 then?",
        buttons: [
            {
                text: "math succ",
                toPath: "mathSucc"
            },
            {
                text: "McFucc off",
                toPath: "fuccOff"
            },
            {
                text: "36,510",
                toPath: "mathCorrect"
            },
            {
                text: "can i just start over plz",
                toPath: "start"
            }
        ]
    },
    mathSucc: {
        text: "fine, then here's an easier problem. what's 2 + 2?",
        buttons: [
            {
                text: "it's 4",
                toPath: "mathCorrect"
            },
            {
                text: "i still am not doing any math",
                toPath: "fuccOff"
            },
            {
                text: "it's 5",
                toPath: "mathWrong"
            }
        ]
    },
    mathWrong: {
        title: "mathematics are a difficult thing",
        text: "well, you did your best. are you ready to start the adventure?",
        buttons: [
            {
                text: "yes",
                toPath: "adventureReady"
            },
            {
                text: "no",
                toPath: "fuccOff"
            }
        ]
    },
    mathCorrect: {
        title: "mathematics are a difficult thing",
        text: "did you cheat?",
        buttons: [
            {
                text: "me? cheat? never",
                toPath: "suspicious"
            },
            {
                text: "no I usually suck",
                toPath: "youDontSuck"
            }
        ]
    },
    youDontSuck: {
        text: "bad! you don't suck and how dare you say you do... you just... sucked at that problem. not all the time. do you want to start the adventure now? it's about time",
        buttons: [
            {
                text: "yes",
                toPath: "adventureReady"
            },
            {
                text: "no",
                toPath: "fuccOff"
            }
        ]
    },
    suspicious: {
        text: "hmmm... if you say say. now can we get on with this adventure already?",
        buttons: [
            {
                text: "yes",
                toPath: "adventureReady"
            },
            {
                text: "no",
                toPath: "fuccOff"
            }
        ]
    },
    fuccOff: {
        title: "fine swine",
        text: "you leave me no choice but to send you back to the beginning",
        buttons: [
            {
                text: "hmph",
                toPath: "start"
            }
        ]
    },
    youllBeOkay: {
        text: "you'll be okay! just get ready for the adventure!",
        buttons: [
            {
                text: "hmph, fine",
                toPath: "adventureReady"
            },
            {
                text: "you're not mom",
                toPath: "iAmMom"
            }
        ]
    },
    pleaseJustTryIt: {
        text: "please just try it! ANGER",
        buttons: [
            {
                text: "no! this is too much pressure!",
                toPath: "tooMuchPressure"
            },
            {
                text: "you're not mom!",
                toPath: "iAmMom"
            },
            {
                text: "i'm not gonna be okay!",
                toPath: "youllBeOkay"
            }
        ]
    },
    iAmMom: {
        text: "YES, I AM MOM. JUST PLAY THE DAMN ADVENTURE",
        buttons: [
            {
                text: "fine you bully ;v",
                toPath: "adventureReady"
            },
            {
                text: "make me.",
                toPath: "fuccOff"
            }
        ]
    },
    adventureReady: {
        title: "once upon a time...",
        text: "once upon a time there was a girl named...",

        buttonVariable: "name",
        toPath: "gotName",

        buttons: [
            {
                value: "Kyndrajauna"
            },
            {
                value: "Michelle Obama"
            },
            {
                value: "Spooky Ghost Girl"
            },
            {
                value: "Strawberry Shortcake"
            }
        ]
    },
    gotName: {
        dynamicText: "today was {name}'s birthday, and she had <i>a lot</i> of plans. the first thing she wanted to do on this fine day was...",
        buttons: [
            {
                text: "go to the store"
            },
            {
                text: "sleep"
            },
            {
                text: "eat breakfast"
            },
            {
                text: "die",
                toPath: "wantToDie"
            }
        ]
    },
    theyWouldntGoThere: {
        dynamicText: "hey! {name} wouldn't go to a strip club! this is lies and slander",
        buttons: [
            {
                text: "smh. try again!",
                toPath: "wantToDie"
            }
        ]
    },
    wantToDie: {
        dynamicText: "{name} decided it was probably best not to die right now, but she didn't rule out the possibility for later. she decided to do this instead...",
        buttons: [
            {
                text: "go skydiving",
            },
            {
                text: "go shopping"
            },
            {
                text: "eat a giant cake"
            },
            {
                text: "go to a strip club",
                toPath: {
                    type: "filter",
                    target: "name",
                    values: [
                        "Kyndrajauna",
                        "Michelle Obama"
                    ],
                    path1: "",
                    path2: "theyWouldntGoThere"
                }
            }
        ]
    }
};

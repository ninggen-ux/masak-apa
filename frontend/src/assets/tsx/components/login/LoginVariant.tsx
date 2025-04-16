const loginFormVariant = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 1,
        },
    },
};

const loginFormH1Variant = {
    initial: {
        opacity: 0,
        scale: 0.9,
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1,
        },
    },
};

const loginFormInputVariant = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const loginFormInputItemVariant = {
    initial: {
        opacity: 0,
        x: -15,
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            delayChildren: 0.2,
        },
    },
};

const loginFormButtonVariant = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const loginFormButtonSubmitVariant = {
    initial: {
        opacity: 0,
        scale: 0.9,
    },
    animate: {
        opacity: 1,
        scale: 1,
    },
};

const loginFormButtonPVariant = {
    initial: {
        opacity: 0,
        scale: 0.9,
    },
    animate: {
        opacity: 1,
        scale: 1,
    },
};

export {
    loginFormVariant,
    loginFormH1Variant,
    loginFormInputVariant,
    loginFormInputItemVariant,
    loginFormButtonVariant,
    loginFormButtonSubmitVariant,
    loginFormButtonPVariant,
};

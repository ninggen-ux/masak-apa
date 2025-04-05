const signupFormVariant = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 1,
        },
    },
};

const signupFormH1Variant = {
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

const signupFormInputVariant = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const signupFormInputItemVariant = {
    initial: {
        opacity: 0,
        x: -15,
    },
    animate: {
        opacity: 1,
        x: 0,
    },
};

const signupFormButtonVariant = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

const signupFormButtonSubmitVariant = {
    initial: {
        opacity: 0,
        scale: 0.9,
    },
    animate: {
        opacity: 1,
        scale: 1,
    },
};

const signupFormButtonPVariant = {
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
    signupFormVariant,
    signupFormH1Variant,
    signupFormInputVariant,
    signupFormInputItemVariant,
    signupFormButtonVariant,
    signupFormButtonSubmitVariant,
    signupFormButtonPVariant,
};

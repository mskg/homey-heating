import { CircularProgress } from "@material-ui/core";
import * as React from "react";

export const Loading: React.FunctionComponent = () => {
    const [completed, setComplete] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setComplete(completed >= 100 ? 0 : completed + 5);
        }, 10);

        return () => clearInterval(timer);
    });

    return (
        <CircularProgress
            // tslint:disable-next-line: jsx-no-multiline-js
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: -40,
                marginLeft: -40,
            }}
            size={80}
            variant="determinate"
            value={completed}
        />
    );
};

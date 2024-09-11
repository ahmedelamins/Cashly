import { useRouteError } from "react-router-dom";
import { Box } from '@mui/material';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Box sx={{ textAlign: 'center', py: 6 }}>
            <h1>
                Oops!
            </h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </Box>
    );
}
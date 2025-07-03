export const NotFound = () => (
    <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">404</h1>
        <span className="font-medium">Oops! Page Not Found!</span>
        <p className="text-center text-muted-foreground">
            It seems like the page you're looking for <br />
            does not exist or not allowed.
        </p>
    </div>
);

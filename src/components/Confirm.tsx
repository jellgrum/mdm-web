import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui';
import { useAlert } from '@/hooks';


export const Confirm = () => {
    const { alertProps } = useAlert();

    return (
        <AlertDialog open={alertProps !== null}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{alertProps?.title}</AlertDialogTitle>
                    <AlertDialogDescription>{alertProps?.description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={alertProps?.onCancel}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={alertProps?.onConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

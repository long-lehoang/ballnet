import LayoutLogin from "../../components/layout/login";
import ResetPasswordForm from "../../components/reset_password";
import { useRouter } from "next/router";

export default function ResetPasswordPage(){
    const router = useRouter();
    
    return (
        <LayoutLogin>
            <ResetPasswordForm 
                token={router.query.token}
            />
        </LayoutLogin>
    );
}
import LayoutLogin from "../components/layout/LayoutLogin";
import SignupForm from "../components/login_signup/SignupForm";

export default function Signup(){
    return (
        <LayoutLogin>
            <SignupForm></SignupForm>
        </LayoutLogin>
    );
}
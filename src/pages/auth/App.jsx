
import AuthButton from "ui/AuthButton"

export default function App () {
    return (
        <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
            <AuthButton type="google"/>
            <AuthButton type="facebook"/>
        </div>
    )
}
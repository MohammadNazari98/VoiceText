import { Link } from "react-router-dom"
import Card from "../components/Card"

const NotFoundPage = () => {
    return (
        <div className="row">
            <Card className="text-center">
                <h1 className="text-primary fw-bold display-1">404</h1>
                <p className="text-color">صفحه ای که به دنبال آن بودید پیدا نشد.</p>
                <Link to={"/"} className="text-decoration-none">
                    بازگشت به صفحه اصلی
                </Link>
            </Card>
        </div>
    )
}

export default NotFoundPage
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="text-center py-3">
            <p className="mb-0">
            &copy; کپی رایت 1405 تمام حقوق محفوظ است | 
            <Link className="text-decoration-none" to="#">ساخته شده توسط MohammadDev</Link></p>
        </footer>
    )
}

export default Footer
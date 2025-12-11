import { Link } from "react-router-dom";

export const navBar_Data = [
    {
        title : "Blog",
        url : "/blogs"
    },

    {
        title : "Login",
        url : "/login"
    },

    {
        title : "Signup",
        url : "/signup"
    }
];

export default function Navbar(){
    return (
        <nav className="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur">
            <div className="max-w-11/12 mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="font-bold text-xl text-accent-primary">
                    <Link to="/">
                        BlogHub
                    </Link>
                </div>

                <div className="flex items-center gap-6">
                    {
                        navBar_Data.map((item, index) => (
                            <Link key={index}  className="hover:text-accent-primary transition-colors" to={item.url}>
                                {item.title}
                            </Link>
                        ))
                    }
                </div>
            </div>
        </nav>
    )
}
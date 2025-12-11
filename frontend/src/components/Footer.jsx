
export default function Footer() {
    return (
        <div>
            <footer className="border-t border-border py-12 px-4 sm:px-6 lg:px-8 bg-card/30">
                <div className="max-w-7xl mx-auto text-center text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} BlogHub. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}
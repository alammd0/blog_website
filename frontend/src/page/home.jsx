import { Link } from "react-router-dom";
import { ArrowRightIcon, BookOpen } from "lucide-react";
import Button from "@mui/material/button";
import { homeFeature } from "../data/home_feature";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div>
      {/* hero section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-32 from-accent-primary/5 to-background">
        <div className="max-w-11/12 mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl font-bold text-balance leading-tight">
                  Share Your <span className="text-accent-primary">Ideas</span>{" "}
                  with the World
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  A modern blogging platform where you can write, share, and
                  engage with a community of readers. Built with cutting-edge
                  technology.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  variant="outlined"
                  className="bg-accent-primary hover:bg-accent-primary/90 text-black rounded-lg"
                >
                  <Link to="/blogs">Start Reading</Link>
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  color="secondary"
                  className="rounded-lg bg-transparent"
                >
                  <Link to="login">Write a Post</Link>
                </Button>
              </div>
            </div>

            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full h-80 from-accent-primary/20 to-accent-secondary/20 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-40 h-40 text-accent-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-11/12 mx-auto">
          <div className="space-y-4 mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">
              Platform Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to run a successful blog
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeFeature.map((feature, i) => (
              <div
                key={i}
                className="border border-border rounded-lg p-6 bg-card/50 hover:bg-card transition-colors"
              >
                <feature.icon className="w-10 h-10 text-accent-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

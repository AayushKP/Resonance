import Lens from "@/components/magicui/lens";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import events from "@/lib/data/events.json";

export default function Events() {
  return (
    <div className="min-h-screen w-full pt-32 px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mb-10">
        {events.map((event, i) => (
          <Card
            key={i}
            className="relative max-w-md shadow-none border-none bg-gradient-to-r bg-white/10 backdrop-blur-2xl"
          >
            <CardHeader>
              <Lens
                zoomFactor={2}
                lensSize={150}
                isStatic={false}
                ariaLabel={`Zoom Area ${i}`}
              >
                <img
                  src={event.img}
                  alt={event.title}
                  width={500}
                  height={500}
                  className="w-full h-60 sm:h-64 md:h-72 lg:h-80 xl:h-96 object-cover rounded-lg"
                />
              </Lens>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-xl md:text-2xl text-metal font-cinzel-decorative-bold">
                {event.title}
              </CardTitle>
              <CardDescription className="text-white font-montserrat">
                {event.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="space-x-4 font-montserrat">
              <a href="/gallery">
                <Button>Gallery</Button>
              </a>

              <a
                href={event.playlistLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  className="text-md cursor-pointer text-white font-cinzel-decorative bg-gradient-to-r from-yellow-800 via-yellow-400 to-yellow-800"
                >
                  Playlist
                </Button>
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

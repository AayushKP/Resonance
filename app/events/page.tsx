import { Lens } from "@/components/magicui/lens";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Events() {
  const cardData = [
    {
      img: "/images/scroll/img1.png",
      title: "TedX HITK - 2025",
      description: "Explore the minds shaping the future of technology.",
      playlistLink: "https://youtube.com/playlist?list=innovation2025",
    },
    {
      img: "/images/scroll/img2.png",
      title: "Republic Day'25",
      description: "Discover how compassion drives change worldwide.",
      playlistLink: "https://youtube.com/playlist?list=humanity2025",
    },
    {
      img: "/images/scroll/img3.png",
      title: "Prothoma'24",
      description: "Journey into a greener, cleaner tomorrow.",
      playlistLink: "https://youtube.com/playlist?list=sustainability2025",
    },
    {
      img: "/images/scroll/img4.png",
      title: "Cadence'24",
      description: "Dive into the art of storytelling and imagination.",
      playlistLink: "https://youtube.com/playlist?list=creativity2025",
    },
    {
      img: "/images/scroll/img5.png",
      title: "Independence Day'24",
      description: "Dive into the art of storytelling and imagination.",
      playlistLink: "https://youtube.com/playlist?list=creativity2025",
    },
  ];

  return (
    <div className="min-h-screen w-full pt-32 px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 mb-10">
        {cardData.map((card, i) => (
          <Card
            key={i}
            className="relative max-w-md shadow-none border-none bg-gradient-to-r from-neutral-900 via-black to-neutral-900"
          >
            <CardHeader>
              <Lens
                zoomFactor={2}
                lensSize={150}
                isStatic={false}
                ariaLabel={`Zoom Area ${i}`}
              >
                <img src={card.img} alt={card.title} width={500} height={500} />
              </Lens>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl text-metal font-cinzel-decorative-bold">
                {card.title}
              </CardTitle>
              <CardDescription className="text-white">
                {card.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="space-x-4">
              <Button>Let&apos;s go</Button>
              <a
                href={card.playlistLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="secondary"
                  className="text-md text-white font-cinzel-decorative bg-gradient-to-r from-yellow-800 via-yellow-400 to-yellow-800"
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

import { Container } from "@/components/container";
import { GameProps } from "@/utils/types/game";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Label } from "./components/label";
import { GameCard } from "@/components/gameCard";
import { Metadata } from "next";

interface ParamsProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ParamsProps): Promise<Metadata> {
  try {
    const response: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`, {
      next: {
        revalidate: 60
      }
    })
    .then((res) => res.json())
    .catch((err) => {
      return {
        title: 'DalyGames - Descubra jogos incríveis para se divertir',
      }
    });

    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true
        }
      }
    }
  } catch (error) {
    return {
      title: 'DalyGames - Descubra jogos incríveis para se divertir'
    }
  }
}

async function getData(id: number) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, {
      cache: 'no-store'
    });

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

async function getRandomgGame() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, {
      cache: 'no-store'
    });

    return res.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Game({
  params: { id }
}: {
  params: { id: number }
}) {
  const game: GameProps = await getData(id);
  const gameRandom: GameProps = await getRandomgGame();

  if (!game) {
    redirect('/');
  }

  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          alt="Imagem detalhe do jogo"
          src={game.image_url}
          fill
          className="object-cover w-full h-80 sm:h-96 opacity-80"
          priority
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
        />
      </div>
      <Container>
        <h1 className="font-bold text-xl my-4">{game.title}</h1>
        <p>{game.description}</p>
        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        <div className="flex gap-2 flex-wrap">
          {game.platforms.map((platform) => (
            <Label key={platform} data={platform} />
          ))}
        </div>
        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        <div className="flex gap-2 flex-wrap">
          {game.categories.map((category) => (
            <Label key={category} data={category} />
          ))}
        </div>
        <p className="mt-7 mb-2"><strong>Lançamento:</strong> {game.release}</p>
        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
        <div className="flex">
          <div className="flex-grow">
            <GameCard key={gameRandom.id} game={gameRandom} />
          </div>
        </div>
      </Container>
    </main>
  );
}

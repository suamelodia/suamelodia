import { getUserById } from '@/lib/usuario'
import { getArtistaByUserId } from '@/lib/artista'
import { getEstabelecimentoByProprietarioId } from '@/lib/estabelecimento'
import ArtistHome from './components/ArtistHome'
import ProprietarioHome from './components/ProprietarioHome'

// This is a placeholder function. In a real app, you'd get the user ID from the session.
async function getCurrentUserId() {
  return 1; // Placeholder user ID
}

export default async function Home() {
  const userId = await getCurrentUserId();
  const user = await getUserById(userId);

  if (!user) {
    return <div>User not found</div>;
  }

  const artist = await getArtistaByUserId(userId);
  const establishment = await getEstabelecimentoByProprietarioId(userId);

  if (artist) {
    return <ArtistHome />;
  } else if (establishment) {
    return <ProprietarioHome />;
  } else {
    return <div>Unknown user type</div>;
  }
}


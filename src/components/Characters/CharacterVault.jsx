import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import "./characterStyle.css";

const characters = [
  {
    id: "alister",
    name: "Alister",
    title: "The Hardware Engineer",
    avatar:
      "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&w=800&q=80",
    species: "Human",
    role: "Main Character",
    pronouns: "he/him",
    status: "In Progress",
    color: "#3134ee",
    summary:
      "A goofy and optimistic hardware engineer who loves tinkering with gadgets and building quirky inventions. He randomly gives tech gifts to his girlfriend Annael.",
    notes:
      "He had an accident causing him to lose his arms...now he has mechanical arms that can transform into various tools and gadgets.",
  },
  {
    id: "annael",
    name: "Annael",
    title: "The HR Specialist",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    species: "Human",
    role: "Main Character",
    pronouns: "she/her",
    status: "In Progress",
    color: "#fea707",
    summary:
      "A bubbly and empathetic HR specialist who helps Alister navigate social interactions and just being a good girlfriend.",
    notes:
      "Her design is slightly on a chubby side with a personality of a golden retriever.",
  },
  {
    id: "chloe",
    name: "Chloe",
    title: "The Software Developer",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    species: "Human",
    role: "Main Character",
    pronouns: "she/her",
    status: "In Progress",
    color: "#8b07fe",
    summary:
      "A stone-faced and sarcastic software developer who is Alister's adopted daughter. She has a love-hate relationship with Alister but deep down cares for him a lot. She's on a revenge quest to see who killed her parents not knowing she's been living in the same roof as the killer.",
    notes: "If it's not a hoodie, it's going to be a black t-shirt.",
  },
  {
    id: "arthur",
    name: "Arthur",
    title: "The Artist",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    species: "Human",
    role: "Main Character",
    pronouns: "he/him",
    status: "In Progress",
    color: "#860000",
    summary: "In Progress",
    notes: "Constantly surrounded by dark academia aesthetics.",
  },
];

export default function CharacterVault() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState(characters[0]?.id || "");

  const filteredCharacters = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return characters;

    return characters.filter((character) => {
      const searchable = [
        character.name,
        character.title,
        character.species,
        character.role,
        character.pronouns,
        character.status,
        character.summary,
        character.notes,
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(search);
    });
  }, [query]);

  const effectiveActiveId = filteredCharacters.some(
    (character) => character.id === activeId,
  )
    ? activeId
    : filteredCharacters[0]?.id;

  const activeCharacter = filteredCharacters.find(
    (character) => character.id === effectiveActiveId,
  );

  return (
    <section id="characters" className="characters-section">
      <div className="container characters-content">
        <motion.div
          className="characters-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="section-kicker">Character Concepts</p>
          <h2>Original Characters</h2>
          <p>
            A Toyhouse-inspired character archive for browsing profiles,
            references, lore, and design notes.
          </p>
        </motion.div>

        <motion.div
          className="character-console"
          style={{
            "--character-accent": activeCharacter?.color || "#ff922b",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          viewport={{ once: true }}
        >
          <div className="character-toolbar">
            <label htmlFor="character-search">
              <i className="fa-solid fa-magnifying-glass" />
              <input
                id="character-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search characters, species, lore..."
              />
            </label>
          </div>

          <aside className="character-list">
            {filteredCharacters.length > 0 ? (
              filteredCharacters.map((character) => (
                <button
                  key={character.id}
                  type="button"
                  className={`character-list-item ${
                    activeCharacter?.id === character.id ? "active" : ""
                  }`}
                  style={{ "--character-accent": character.color }}
                  onClick={() => setActiveId(character.id)}
                >
                  <div className="character-mini-avatar">
                    <i className="fa-solid fa-user" aria-hidden="true" />
                  </div>

                  <span>
                    <strong>{character.name}</strong>
                    <small>{character.role}</small>
                  </span>
                </button>
              ))
            ) : (
              <div className="character-empty-small">
                No characters found. Try another keyword.
              </div>
            )}
          </aside>

          <main className="character-display">
            {activeCharacter ? (
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeCharacter.id}
                  className="character-profile"
                  style={{ "--character-accent": activeCharacter.color }}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="character-hero">
                    <div className="character-avatar">
                      <i className="fa-solid fa-user" aria-hidden="true" />
                    </div>

                    <div className="character-title-block">
                      <p>{activeCharacter.role}</p>
                      <h3>{activeCharacter.name}</h3>
                      <span>{activeCharacter.title}</span>
                    </div>
                  </div>

                  <div className="character-meta-grid">
                    <div>
                      <small>Species</small>
                      <strong>{activeCharacter.species}</strong>
                    </div>

                    <div>
                      <small>Pronouns</small>
                      <strong>{activeCharacter.pronouns}</strong>
                    </div>

                    <div>
                      <small>Status</small>
                      <strong>{activeCharacter.status}</strong>
                    </div>
                  </div>

                  <div className="character-section-card">
                    <h4>Profile</h4>
                    <p>{activeCharacter.summary}</p>
                  </div>

                  <div className="character-section-card">
                    <h4>Design Notes</h4>
                    <p>{activeCharacter.notes}</p>
                  </div>
                </motion.article>
              </AnimatePresence>
            ) : (
              <div className="character-empty-large">
                <i className="fa-solid fa-folder-open" />
                <h3>No character selected</h3>
                <p>Try another search keyword.</p>
              </div>
            )}
          </main>
        </motion.div>
      </div>
    </section>
  );
}

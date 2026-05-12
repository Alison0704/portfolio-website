import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import "./characterStyle.css";

const characters = [
  {
    id: "sol",
    name: "Sol",
    title: "Prototype Guardian",
    avatar:
      "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&w=800&q=80",
    species: "Android",
    role: "Main Character",
    pronouns: "they/them",
    status: "Active",
    color: "#ff922b",
    summary:
      "A calm machine built to guide lost travelers through abandoned stations.",
    notes:
      "Designed around soft robotics, old hardware, and quiet emotional intelligence.",
  },
  {
    id: "luna",
    name: "Luna",
    title: "Archive Witch",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    species: "Human",
    role: "Main Character",
    pronouns: "she/her",
    status: "Active",
    color: "#8ec5ff",
    summary:
      "A quiet archivist who keeps records of forgotten machines, strange maps, and old promises.",
    notes:
      "Her design mixes soft fantasy silhouettes with technical accessories and handwritten notes.",
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
          <p className="section-kicker">Character Vault</p>
          <h2>Original Characters</h2>
          <p>
            A Toyhouse-inspired character archive for browsing profiles,
            references, lore, and design notes.
          </p>
        </motion.div>

        <motion.div
          className="character-console"
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
                  onClick={() => setActiveId(character.id)}
                >
                  <div
                    className="character-mini-avatar"
                    style={{ borderColor: character.color }}
                  >
                    {character.avatar ? (
                      <img src={character.avatar} alt={character.name} />
                    ) : (
                      <i className="fa-solid fa-user-astronaut" />
                    )}
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
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.98 }}
                  transition={{ duration: 0.28 }}
                >
                  <div className="character-hero">
                    <div
                      className="character-avatar"
                      style={{ borderColor: activeCharacter.color }}
                    >
                      {activeCharacter.avatar ? (
                        <img
                          src={activeCharacter.avatar}
                          alt={activeCharacter.name}
                        />
                      ) : (
                        <i className="fa-solid fa-user-astronaut" />
                      )}
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

import { Header } from "../../components/Header";
import background from "../../assets/background.png"
import ItemList from "../../components/itemList/index.jsx";
import { useState } from 'react';
import './styles.css'

function App() {
  const [user, setUser] = useState('')
  const [currentUser, setcurrentUser] = useState(null)
  const [repos, setRepos] = useState(null)

  const handGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser
      setcurrentUser({ avatar_url, name, bio, login })

      const repoData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await repoData.json()

      if (newRepos.length) {
        setRepos(newRepos)
      }
    }
  }


  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} className="background" alt="background app" />
        <div className="info">
          <div>
            <input name="usuario" placeholder="@username" value={user} onChange={event => setUser(event.target.value)} />
            <button onClick={handGetData} type="button">Buscar</button>
            <div>
              {currentUser?.name ? (
                <>
                  <div className="perfil">
                    <img src={currentUser.avatar_url} className="profile" alt="profile" />
                    <div>
                      <h3>{currentUser.name}</h3>
                      <span>@{currentUser.login}</span>
                      <p>{currentUser.bio? currentUser.bio : "Sem biografia"}</p>
                    </div>
                  </div>
                  <hr />
                </>
              ) : null}
              {repos?.length ? (
                <div>
                  <h4 className="repositorio">Repositórios</h4>
                  {(repos.map(repo => <ItemList title={repo.name} description={repo.description? repo.description : "--"}/>))}
                </div>
              ) : null}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { MainContainer, Logo, NavButton, 
    PageTitle, PostFormContainer, OptionsBar } from "../../components"
import { useParams, useLocation, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../config";

const PostPage = () => {
    
    const location = useLocation();
    const { id } = useParams();

    const [doc, setDoc] = useState({});
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    //const [articleDate, setArticleDate] = useState(null);
    //const [tags, setTags] = useState([]);
    const [redirect, setRedirect] = useState(false);

     useEffect( () => {
        if(id){
            if(location.doc){
                setDoc(location.doc);
            } else {
                db.collection('posts').doc(id).get()
                    .then( (res) => {
                        let auxDoc = res.data()
                        auxDoc.id = res.id
                        setDoc(auxDoc);
                    })
                    .catch( err => window.alert('Não foi possível recuperar o documento ' + err))
            }
            try{
                setTitle(doc.title);
                setAuthor(doc.author);
                setContent(doc.content);
            } catch(e) {
                window.alert('aconteceu um erro inesperado :o \n' + e)
            }
        }
    }, [id, location, doc]) 

    const deletePost = () => {
        let confirm = window.confirm('Tem certeza que deseja apagar esta publicação?');
        if(confirm){
            db.collection('posts').doc(id).delete()
                .then( () => {
                    window.alert('Publicação apagada!');
                    setRedirect(true);
                })
                .catch( err => window.alert('Não foi possivel apagar\n' + err))
        }
    }

    const savePost = () => {
        const post = {
            title: title,
            content: content, 
            author: author,
        }
        db.collection('posts').doc(id).set(post)
            .then( () => {
                window.alert('Publicação editada com sucesso!');
                setRedirect(true);
            })
            .catch( err => window.alert('Não foi possivel criar\n' + err))
    }

    const createPost = () => {
        const post = {
            title: title,
            content: content, 
            author: author,
        }
        db.collection('posts').add(post)
            .then( () => {
                window.alert('Publicação criada com sucesso! Te amo.');
                setRedirect(true);
            })
            .catch( err => window.alert('Não foi possivel criar\n' + err))
    }

    return(
        <MainContainer >
            <Logo />
            <NavButton title='Voltar' to='/posts' />
            <PageTitle title={(id ? 'Editar' : 'Criar') + ' Publicação'} />
            <PostFormContainer>
                <label>Titulo da publicação: </label>
                <input type='text' value={title} onChange={e => setTitle(e.target.value)}/>
                <label>Autor(a): </label>
                <input type='text' value={author} onChange={e => setAuthor(e.target.value)}/>
                <label>Resumo: </label>
                <textarea value={content} onChange={e => setContent(e.target.value)}/>
            </PostFormContainer>
            <OptionsBar>
                {id ? 
                <NavButton title='Salvar' onClick={savePost}/> :
                <NavButton title='Criar' onClick={createPost}/>
                }
                <NavButton title='Cancelar' to='/posts' hollow/>
                <div style={{width: '50%'}}></div>
                {id && (<NavButton title='Apagar' onClick={deletePost} red/> )}
            </OptionsBar>
            { redirect && <Redirect to='/posts' />}
        </MainContainer>
    )
}

export default PostPage;
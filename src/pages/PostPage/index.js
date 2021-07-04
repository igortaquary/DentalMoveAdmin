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
    const [link, setLink] = useState('');
    const [articleDate, setArticleDate] = useState(null);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const [loading, setLoading] = useState(false);

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
                setLink(doc.link);
                setSelectedTags(doc.tags);
                setArticleDate(doc.articleDate);
            } catch(err) {
                window.alert('Ocorreu um erro inesperado\n' + err)
            }
        }
        db.collection('tags').get()
            .then( res => {
                let auxTags = [];
                res.forEach( tagDoc => {
                    let auxDoc = tagDoc.data();
                    auxTags.push(auxDoc.name);
                })
                setTags(auxTags);
            })
            .catch( (err) => window.alert('Erro ao carregar as tags\n' + err))

        console.log('a')
    }, [id, doc, location.doc])

    useEffect(() => {
        if(selectedTags){
            try{
            selectedTags.forEach( tag => {
                if(document.getElementById('tag:'+tag)){
                    document.getElementById('tag:'+tag).checked = true;
                }
            })
            } catch {
                console.log('As tags não carregaram')
            }
        }
        console.log('bb')
    }, [selectedTags, tags])

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

    const formatObject = () => {
        if(!/[12][0-9]{3}$/.test(articleDate)){
            throw new Error("Digite um ano de criação válido");
        }
        if(selectedTags.length === 0) {
            throw new Error("Selecione pelo menos uma tag");
        }
        const post = {
            title: title,
            content: content, 
            author: author,
            link: link,
            tags: selectedTags,
            articleDate: articleDate,
        }
        return post;
    }

    const savePost = async () => {
        setLoading(true);
        try{
            const post = formatObject();
            await db.collection('posts').doc(id).set(post);
            window.alert('Publicação editada com sucesso!');
            setRedirect(true);
        } catch (err) {
            window.alert('Não foi possivel criar\n' + err)
        }
        setLoading(false);
    }

    const createPost = async () => {
        setLoading(true);
        try{
            const post = formatObject();
            await db.collection('posts').add(post);
            window.alert('Publicação criada com sucesso! Te amo.');
            setRedirect(true);
        } catch (err) {
            window.alert('Não foi possivel criar\n' + err)
        }
        setLoading(false);
    }

    const toggleTag = (tag) => {
        let auxTags = [];
        if(selectedTags){
            auxTags = selectedTags;
        }
        if(auxTags.includes(tag)){
            auxTags = auxTags.filter( (value) => value !== tag);
        } else {
            auxTags.push(tag);
        }
        setSelectedTags(auxTags);
    }

    return(
        <MainContainer >
            <Logo />
            <NavButton title='Voltar' to='/posts' />
            <PageTitle title={(id ? 'Editar' : 'Criar') + ' Publicação'} />
            <PostFormContainer>
                <label>Titulo da publicação *: </label>
                <input type='text' value={title} onChange={e => setTitle(e.target.value)} required/>
                <label>Autor(a) *: </label>
                <input type='text' value={author} onChange={e => setAuthor(e.target.value)} required/>
                <label>Link do artigo: &nbsp;&nbsp;
                    <a href={link} target='_blank' rel='noreferrer'>{link}</a>
                </label>
                <input type='text' value={link} onChange={e => setLink(e.target.value)}/>
                <label>Ano do artigo *:</label>
                <input type='text' value={articleDate} onChange={e => setArticleDate(e.target.value)} required/>
                <label>Resumo *: </label>
                <textarea value={content} onChange={e => setContent(e.target.value)} required/>
                <label>Tags *: </label>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                    {tags.map( tag => 
                        <div style={{display: 'flex', flexDirection: 'row', alignItems:'center', margin:'5px 10px'}}>
                            <input type='checkbox' id={'tag:'+tag}
                            onClick={() => {toggleTag(tag)}}
                            style={{margin: '5px 5px 5px 18px'}} />
                            {tag}
                        </div>
                    )}
                </div>
            </PostFormContainer>
            <OptionsBar>
                {id ? 
                <NavButton title='Salvar' onClick={savePost} disabled={loading}/> :
                <NavButton title='Criar' onClick={createPost} disabled={loading}/>
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
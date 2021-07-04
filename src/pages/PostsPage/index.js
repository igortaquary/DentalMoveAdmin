import { Link } from 'react-router-dom'
import { Logo, MainContainer, NavButton, OptionsBar, PostsTable } from '../../components'
import eye from '../../assets/eye.png'
import { db } from '../../config';
import { useEffect, useState } from 'react';

const PostsPage = () => {
    
    const [requestData, setRequestData] = useState([]);
    const [displayPosts, setDisplayPosts] = useState([]);

    useEffect(() => {
        let auxData = [];
        db.collection("posts").get()
            .then( querySnapshot => {
                querySnapshot.forEach( doc => {
                    let auxDoc = doc.data();
                    auxDoc.id = doc.id;
                    auxData.push(auxDoc);
                })
                setRequestData(auxData);
                setDisplayPosts(auxData);
            })
            .catch( err => window.alert(err));
    }, []);

    const searchPosts = (text) => {
        let auxPosts = []
        requestData.forEach( post => {
            if( (post.title).toLowerCase().includes(text.toLowerCase()) ||
                (post.author).toLowerCase().includes(text.toLowerCase())
            ){
                auxPosts.push(post);
            }
        });
        setDisplayPosts(auxPosts);
    }

    return(
        <MainContainer>
            <Logo/>
            <OptionsBar>
                <NavButton to='/posts/create' title='Novo post'/>
                <NavButton to='/tags' title='Gerenciar Tags' hollow/>
                <input placeholder="Pesquisar por post" onChange={(e) => searchPosts(e.target.value)} />
                { displayPosts.length === requestData.length ?
                    <div style={{marginLeft: 'auto'}}>Numero de posts: {requestData.length}</div> :
                    <div style={{marginLeft: 'auto'}}>Numero de posts: {displayPosts.length + "/" +requestData.length}</div>
                }
            </OptionsBar>
            <PostsTable>
                <tr>
                    <th>Título</th>
                    <th>Autor(a)</th>
                    <th>Tags</th>
                    <th>Detalhes</th>
                </tr>
                <tbody>
                { displayPosts.map( data =>
                        <tr>
                            <td> {data.title} </td>
                            <td> {data.author} </td>
                            <td > 
                                { data.tags && data.tags.map( tag => tag+', ')} 
                            </td>
                            <td>
                                <Link to={{ pathname:'/posts/edit/'+data.id,
                                            doc: data, }} >
                                    <img src={eye} alt='detalhes' height='20px'/>
                                </Link>
                            </td>
                        </tr>
                ) }
                </tbody>
            </PostsTable>
        </MainContainer>
    )
}

export default PostsPage;
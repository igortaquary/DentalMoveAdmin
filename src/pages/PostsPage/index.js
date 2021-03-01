import { Link } from 'react-router-dom'
import { Logo, MainContainer, NavButton, OptionsBar, PostsTable } from '../../components'
import eye from '../../assets/eye.png'
import { db } from '../../config';
import { useEffect, useState } from 'react';

const PostsPage = () => {
    
    const [requestData, setRequestData] = useState([]);

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
            })
            .catch( err => window.alert(err));
    }, []);


    return(
        <MainContainer>
            <Logo/>
            <OptionsBar>
                <NavButton to='/posts/create' title='Novo post'/>
                <NavButton to='/tags' title='Gerenciar Tags' hollow/>
                <div style={{marginLeft: 'auto'}}>Numero de posts: {requestData.length}</div>
            </OptionsBar>
            <PostsTable>
                <tr>
                    <th>Título</th>
                    <th>Autor(a)</th>
                    <th>Tags</th>
                    <th>Detalhes</th>
                </tr>
                <tbody>
                { requestData.map( data =>
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
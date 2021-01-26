import { useEffect, useState } from "react";
import { Logo, MainContainer, NavButton, OptionsBar, PageTitle, PostsTable } from "../../components"
import {db} from '../../config.js';
import remove from '../../assets/delete.png'
import { Redirect } from 'react-router'

const TagsPage = () => {

    const [newTag, setNewTag] = useState('');
    const [tags, setTags] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect( () => {
        db.collection('tags').get()
        .then( res => {
                let auxTags = [];
                res.forEach( doc => {
                    let auxDoc = doc.data();
                    auxDoc.id = doc.id;
                    auxTags.push(auxDoc);
                    console.log(auxTags)
                })
                setTags(auxTags);
            })
            .catch( err => window.alert('Houve um erro ao carregar as tags: \n' + err))
        }, [])

    const handleNewTag = () => {
        if(newTag.length > 2){
        db.collection('tags').add({name: newTag})
            .then( () => { 
                window.alert('Tag criada com sucesso.')
                setRefresh(true);
            })
            .catch( err => window.alert('Erro ao criar a tag: \n', err))
        } else {
            window.alert('A nova tag precisa ter pelo menos 3 caracteres')
        }
    }

    const deleteTag = (tagId) => {
        db.collection('tags').doc(tagId).delete()
            .then( () => {
                window.alert('Tag apagada');
                setRefresh(true);
            })
            .catch( err => window.alert(err))
    }

    return(
        <MainContainer>
            <Logo />
            <PageTitle title='Tags'/>
            <OptionsBar>
                <NavButton to='/posts' title='Gerenciar Posts' hollow/>
            </OptionsBar>
            <OptionsBar>
                <label>Nova tag: </label>
                <input type='text' value={newTag} style={{ margin: '0 10px'}}
                onChange={e => setNewTag(e.target.value)}/>
                <NavButton title='Criar Tag' onClick={handleNewTag} />
            </OptionsBar>
            <PostsTable>
                <tr>
                    <th>Tag</th>
                    <th>Apagar</th>
                </tr>
                { 
                    
                }
                {
                    tags.map( (tag) => 
                        <tr key={'tag:'+tag.id}>
                            <td>{tag.name}</td>
                            <td>
                                <img src={remove} alt='Apagar' height='20px'
                                onClick={() => deleteTag(tag.id)} style={{cursor: 'pointer'}}/>
                            </td>
                        </tr>
                    )
                }
            </PostsTable>
            { refresh && <Redirect to='/tags' /> }
        </MainContainer>
    )
}

export default TagsPage;
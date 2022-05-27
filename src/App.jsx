import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { MUTATION, QUERY, SUBSCRIPTION } from './query';

function App() {
  const { data, loading, error } = useQuery(QUERY)
  const [ newFlower ] = useMutation(MUTATION, {
    update: (cache, data) => {
      console.log(data)
    }
  })

  const handleSubmit = e => {
    e.preventDefault()

    const { name, price } = e.target

    newFlower({
      variables: {
        name: name.value,
        price: price.value - 0
      }
    })
  }

  useSubscription(SUBSCRIPTION, {
		onSubscriptionData: ({ client: { cache }, subscriptionData: {data} }) => {
		  cache.modify({
        fields: {
          flowers: (flowers = []) => {}
        }
		  })
		},
	})

  return (<>
    <form action="" onSubmit={handleSubmit}>
      <input name='name' type="text" placeholder='name' />
      <input name='price' type="number" placeholder='price' />
      <button type='submit'>Send</button> 
    </form>

    { error && <h1>error</h1>}
    { loading && <h1>loading...</h1>}
    {
      data && data.flowers.map((e, i) => (
        <h5 key={i}>{ e.name }</h5>
      ))
    }
  </>)
}

export default App;
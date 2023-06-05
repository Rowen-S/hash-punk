import { useActiveWeb3React } from 'hooks/web3'
import { Route, RouteProps } from 'react-router-dom'
import { RedirectPathToHomeOnly } from './Home/redirects'

export const RoleRoute = ({ ...rest }: RouteProps) => {
  const { account } = useActiveWeb3React()

  if (account) {
    return <Route {...rest} />
  } else {
    return <Route component={RedirectPathToHomeOnly} />
  }
}

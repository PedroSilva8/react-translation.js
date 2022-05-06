import { Dispatch } from "react"
import React = require("react")

type Trans = {
    [key: symbol]: Trans
}

interface Translation {
    lang: string
    content: Trans
}

interface TranslationProps { children: any }


interface TranslationState {
    translations: Translation[], 
    selected: number
}

interface TranslationContext {
  state:TranslationState
  setState: Dispatch<Partial<TranslationState>>
}

const GlobalTransState = React.createContext<TranslationState>({ translations: [], selected: -1 })
const DispatchTransState = React.createContext<Dispatch<Partial<TranslationState>>>({} as Dispatch<Partial<TranslationState>>)

const TranslationJSContext = (props: TranslationProps) => {

    const [state, dispatch] = React.useReducer((state: TranslationState, newState: Partial<TranslationState>) => ({ ...state, ...newState }), { translations: [], selected: -1 } )

      return (
        <GlobalTransState.Provider value={state}>
          <DispatchTransState.Provider value={dispatch}>
            { props.children }
          </DispatchTransState.Provider>
        </GlobalTransState.Provider>
      );
}

export const SelectTrans = (lang: string, context: TranslationContext) => context.setState({...context.state, selected: context.state.translations.findIndex((e) => e.lang == lang) })

export const useTranslation = () : TranslationContext => { return { state: React.useContext(GlobalTransState), setState:  React.useContext(DispatchTransState) } }

export const LoadTrans = (name: string, json: any, context: TranslationContext, setCurrent = false) => {

    if (typeof json == "string")
        json = JSON.parse(json)
        
    if (setCurrent)
      context.state.selected = context.state.translations.length
    context.state.translations.push({ lang: name, content: json })
    context.setState({...context.state, translations: context.state.translations})
}


const GetSelectedTrans = (c: TranslationState) : Translation => c.selected == -1 ? { lang: "", content: {} } : c.translations[c.selected]

const GetNested = (obj: Trans, ...args: string[]) => args.reduce<Record<string, Trans>>((obj, level) => obj && obj[level], obj)

export const T = (value: string) => {
  const c = React.useContext(GlobalTransState)
  const v = GetNested(GetSelectedTrans(c).content, ...value.split('.'))
  if (v === undefined)
      return value
  return v
}

export default TranslationJSContext
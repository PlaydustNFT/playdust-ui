Playdust uses Recoil as its state management framework. Recoil is comprised of atoms - which represent a piece of state, and selectors - which represent a piece of derived state.

This document will detail the core atoms and selectors used by the Playdust UI.

appStateAtom (atom):
https://github.com/PlaydustNFT/playdust-ui/blob/main/src/App/_atoms/appStateAtom.ts

The appStateAtom contains the tabs of the app. The initial state of the atom is https://github.com/PlaydustNFT/playdust-ui/blob/main/src/App/_helpers/getDefaultAppState.ts. As described in the README.md, a tab represents a list of windows.

```
const newHomeWindow: () => AppWindowType = () => ({
  type: 'home',
  state: '',
});

const getDefaultAppState = (tabId?: string): AppStateType => {
  const homeWindow = newHomeWindow();
  const newTabId = tabId ?? shortId();

  return {
    tabs: [
      {
        id: newTabId,
        windows: [homeWindow],
        selectedWindowIdx: 0,
      },
    ],
    selectedTabId: newTabId,
  };
};
```

activeTabAtom (selector):
https://github.com/PlaydustNFT/playdust-ui/blob/main/src/App/_atoms/activeTabAtom.ts

The activeTabAtom is derived from the appStateAtom. It's purpose is to use appStateAtom's selectedTabId to narrow the tabs array to the single active tab.

activeWindowAtom (selector):

As described above, a tab is a list of windows. The activeWindowAtom uses a tabs selectedWindowIdx to narrow the tab's window array to a single active window.

To summarize, the data flow of these core Recoil atoms is the following:
appStateAtom -> activeTabAtom -> activeWindowAtom

The core components which consume this data flow are AppStateProvider and Window.
appStateAtom -> activeTabAtom -> activeWindowAtom -> {AppStateProvider, Window}

~

AppStateProvider:

Null renderer which syncs browser history and internal app state and vice versa. setAppWindowState (appStateAtom)

~

Window:

Window is a component with the self-explanatory purpose of rendering our concept of window. There are several different types of windows (address, block, home, search, tx, epoch). The WindowSwitch component which is a decendent component of Window resolves the window type to the component that handles that window type (i.e. address -> <Address />, etc).

A brief overview of the various windows

- home displays a list of top NFT collections and presents a search input.
- address, block, tx, and epoch are part of the blockchain explorer part of our application.
- search is the core of the application, which allows the user to search our NFT index and ultimately navigate to individual NFTs to view, buy, and sell.

One import technical detail of Window involves RecoilRoot (https://recoiljs.org/docs/api-reference/core/RecoilRoot). As described in the Recoil documentation RecoilRoot provides the context in which atoms have values. Must be an ancestor of any component that uses any Recoil hooks.

We have a top-level RecoilRoot in our top-level App component (https://github.com/PlaydustNFT/playdust-ui/blob/main/src/App/App.tsx#L47, https://github.com/PlaydustNFT/playdust-ui/blob/main/src/App/Provider/Provider.tsx#L8). However the Window component also renders a RecoilRoot (`<RecoilRoot key={`${activeWindow.tabId}`}>`) resulting in nested RecoilRoots. First, let's look at the technical details of nested RecoilRoots and then we can explain why we used this mechanism.

The behavior of nested RecoilRoots is supported by Recoil and is described here: https://recoiljs.org/docs/api-reference/core/RecoilRoot#using-multiple-recoilroots. In particular:

```
Multiple <RecoilRoot>'s may co-exist and represent independent providers/stores of atom state; atoms will have distinct values within each root. This behavior remains the same when you nest one root inside anther one (inner root will mask outer roots), unless you specify override to be false (see "Props").
```

Therefore, our use of nested RecoilRoots is to allow each window to have it's own independent Recoil state (such as a search query). That said, we still have state from the top-level RecoilRoot that we would like to share among all windows that we don't want independent copies of such as the connected wallet and connected wallet's profile - this is shared state. To pass this shared state into each window's RecoilRoot we use WindowStateProvider (https://github.com/PlaydustNFT/playdust-ui/blob/main/src/App/Window/WindowStateProvider.tsx).

Window specific atoms:
windowStateStorageAtom (atom) -> windowStateAtom (selector)
windowStateStorageAtom (atom) -> windowStateAvailableAtom (selector)

windowStateAtom (selector) and windowStateAvailableAtom (selector) are similiar selectors.

windowStateAtom (selector) checks to see if windowStateStorageAtom (atom) exists. If it does, it returns it, otherwise it throws an error.
windowStateAvailableAtom (selector) checks to see if windowStateStorageAtom (atom) exists. If it does, it returns true, otherwise false.

windowStateAvailableAtom is used in Window. If false, Window doesn't render WindowSwitch.

windowStateAtom (selector) is a bit interesting. It's getter is described as above, however it's setter sets windowStateStorageAtom. Since windowStateStorageAtom is upstream of windowStateAtom, setting windowStateStorageAtom ultimately sets windowStateAtom.

windowStateAtom (selector) is set in WindowStateProvider (https://github.com/PlaydustNFT/playdust-ui/blob/main/src/App/Window/WindowStateProvider.tsx) by useEffect.

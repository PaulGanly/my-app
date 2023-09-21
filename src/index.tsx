import React, {StrictMode, useEffect, useState} from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import '@lmig/lmds-react/base.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import {Outlet, RootRoute, Route, Router,Link, RouterProvider} from "@tanstack/react-router";
import {Content, Footer, GridCol, GridRow, Header, Heading, LogoLiberty} from "@lmig/lmds-react";
import ReactDOM from 'react-dom/client'
import {Dashboard} from "./dashboard/Dashboard";
import {ExistingProjects} from "./existing-projects/ExistingProjects";
import {ImportProject} from "./import-project/ImportProject";
import {Tutorial} from "./tutorial/Tutorial";
import {ExistingProject} from "./existing-project/ExistingProject";

const rootRoute = new RootRoute({
    component: Root,
})

function Root() {
    const [totalReactPackages, setTotalReactPackages] = useState(null);

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        fetch('https://api.npms.io/v2/search?q=react')
            .then(response => response.json())
            .then(data => setTotalReactPackages(data.total));

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);


    return (
        <>

            <Header className={'fixed full-width'}>
                <GridRow>
                    <GridCol base={3}><LogoLiberty/></GridCol>
                    <GridCol base={9} className={"padd-6"}>
                        <Heading className={"no-margin"}>AutoTest AI</Heading>
                    </GridCol>
                </GridRow>
            </Header>
            <Content fullWidth={true}>
                <div className={"sidenav"}>
                    <Link to="/"><span>Home</span></Link>
                    <Link to="/projects"><span>Existing Projects</span></Link>
                    <Link to="/add-project"><span>Import Project</span></Link>
                    <Link to="/tutorial"><span>Tutorial</span></Link>
                </div>
                <div className={"main"}>
                    <GridRow gutters>
                        <GridCol>
                            <Outlet/>
                        </GridCol>
                    </GridRow>
                </div>
            </Content>
            <Footer className={'footer'}>
                <p>&copy; {new Date().getFullYear()} Liberty Mutual Insurance Company, 175 Berkeley Street, Boston, MA
                    02116</p>
            </Footer>
        </>

    )
}

export async function fetchProjectByName(name: string) {
    return undefined
}

// Create an index route
const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Dashboard,
})

const tutorialRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/tutorial',
    component: Tutorial,
})

const projectsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/projects',
    component: ExistingProjects,
})

const importProjectRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/add-project',
    component: ImportProject,
})

const projectRoute = new Route({
    getParentRoute: () => rootRoute,
    path: '/project/$projectName',
    parseParams: (params) => ({
        projectName: params.projectName,
    }),
    loader: async ({ params: { projectName } }) => fetchProjectByName(projectName),
    component: ExistingProject,
})
// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, tutorialRoute, projectsRoute, importProjectRoute, projectRoute])

// Create the router using your route tree
const router = new Router({ routeTree })

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

// Render our app!
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>,
    )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

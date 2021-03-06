import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from '../../../contexts/user';
import { LoadingScreen } from '../LoadingScreen';
import { Navigation } from './Navigation';

type PageProps = {
	title: string;
	children: React.ReactNode;
	hideMenu?: boolean;
}

export const Page = ({ title, children, hideMenu }: PageProps) => {
	const { loading } = useUser();
	const router = useRouter();

	const currentPage = router.pathname || '/';

	if (loading) return <LoadingScreen />;

	return (
		<>
			<Head>
				<title>{title} | Event Companion</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout style={{ minHeight: '100vh' }}>
				{!hideMenu && <Navigation selectedPage={currentPage} />}
				<Content style={{ position: 'relative', padding: '1em' }}>
					{children}
				</Content>
			</Layout>
		</>
	);
};
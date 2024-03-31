
import Link from 'next/link'

export default function LinksTable({ links }: any) {

    return (
        <>
            <div className="flex flex-col flex-wrap w-full mt-10 place-items-center">
                <h2 className="font-bold text-4xl mb-4 ">List of links</h2>
                <div className="flex flex-col w-2/4 justify-self-center">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left text-sm font-light">
                                    <tbody>
                                        {links.map((link: any) => {
                                            return (
                                                <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                                    <Link href={`${link.url}`}>
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium text-center">{link.url}</td>
                                                    </Link>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
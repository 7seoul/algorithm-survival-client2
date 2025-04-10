import { useQuery } from '@tanstack/react-query'
import { getGroupList } from '@/apis/apis'
import { GroupListResponse } from '@/types/GroupType'
import GroupCard from '@/components/GroupCard'

function GroupPage(){
  const {data, isLoading} = useQuery<GroupListResponse>({
    queryKey: [`groupList`],
    queryFn: async () => (await getGroupList()),
    staleTime: 1000 * 10
  })

  if (isLoading){
    return (<div className='w-full h-dvh flex justify-center items-center'>
      <span className="items-center loading loading-spinner loading-xl"></span>
    </div>)
  }

  return(
    <div className='flex flex-col gap-6 mt-6'>
      <div className="flex justify-between">
        <h1 className='font-semibold text-3xl'>그룹 탐색</h1>
        <label className="input">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
          <input type="search" className="grow" placeholder="Search" />
        </label>
      </div>
      <section className="grid grid-cols-3 gap-4">
      {data?.success === true && data.groups.map((group)=>(
        <GroupCard key = {group._id} data={group} />
      ))}
      </section>
    </div>
  )
}

export default GroupPage
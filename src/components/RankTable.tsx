import { Calendar, Medal } from 'lucide-react'
import { Link } from 'react-router'

interface groupTableProps {
  datas : {
    type : 'group',
    groupDatas : Array<groupRank>
  } | {
    type : 'user',
    userDatas : Array<userRank>
  }
}

interface userRank{
  name : String
  handle : String
  tier : Number
  solved : Number
  currentStreak : Number
  maxStreak : Number
}

interface groupRank{
  groupName: String
  _id: Number
  score : Number
  currentStreak: Number
  maxStreak: Number
}

function RankTable({...props} : groupTableProps){
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table className="table">
    <thead>
      <th>순위</th>
      <th>이름</th>
      <th>
        <div className='flex items-center gap-1 justify-end'>
          <Medal className='w-4 h-4 text-success' />
          <span>점수</span>
        </div>
      </th>
      <th>
        <div className='flex items-center gap-1 justify-end'>
          <Calendar className='w-4 h-4 text-success'/>
          <span>스트릭</span>
        </div>  
      </th>
    </thead>
    <tbody>
      { props.datas.type === 'group' ? (
        props.datas.groupDatas.map((data,idx)=>(
          <tr className={`hover:bg-base-300 ${idx===0 ? 'text-warning' : idx === 1 ? 'text-accent' : idx == 2 ? 'text-primary' : '' }`}>
            <th>{idx + 1}</th>
            <td>
              <Link to={`/groups/${data._id}`} className='flex items-center gap-1'>
                <div className='avatar'>
                  <div className="w-4 rounded-full"><img src={`https://gravatar.com/avatar/${data._id}?d=retro`} alt="group_img" />
                  </div>
                </div>
                <span>{data.groupName}</span>
              </Link></td>
            <td><span className='flex justify-end'>{data.score.toLocaleString()}</span></td>
            <td><span className='flex justify-end'>{data.maxStreak.toLocaleString()}</span></td>
          </tr>
        )) 
      )
      :(
        props.datas.userDatas.map((data,idx) => (
          <tr className={`hover:bg-base-300 ${idx===0 ? 'text-warning' : idx === 1 ? 'text-accent' : idx == 2 ? 'text-primary' : '' }`}>
            <th>{idx + 1}</th>
            <td>{data.name}</td>
            <td><span className='flex justify-end'>{data.solved.toLocaleString()}</span></td>
            <td><span className='flex justify-end'>{data.maxStreak.toLocaleString()}</span></td>
          </tr>
        ))
      )
    }
    </tbody>
    </table>
    </div>
  )

}


export default RankTable
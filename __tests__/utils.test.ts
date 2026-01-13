import { describe, it, expect } from 'vitest'
import { cn, parseGithubRepoUrl } from '@/lib/utils'

describe('Utils', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      const result = cn('bg-red-500', 'text-white')
      expect(result).toBe('bg-red-500 text-white')
    })

    it('should handle conditional classes', () => {
      const result = cn('base-class', false && 'hidden', 'visible')
      expect(result).toBe('base-class visible')
    })

    it('should merge tailwind classes correctly', () => {
      const result = cn('px-2 py-1', 'px-4')
      expect(result).toBe('py-1 px-4')
    })
  })

  describe('parseGithubRepoUrl', () => {
    it('should parse valid GitHub URLs', () => {
      const result = parseGithubRepoUrl('https://github.com/owner/repo')
      expect(result).toEqual({ repoOwner: 'owner', repoName: 'repo' })
    })

    it('should parse URLs with .git extension', () => {
      const result = parseGithubRepoUrl('https://github.com/owner/repo.git')
      expect(result).toEqual({ repoOwner: 'owner', repoName: 'repo' })
    })

    it('should handle URLs without https', () => {
      const result = parseGithubRepoUrl('github.com/owner/repo')
      expect(result).toEqual({ repoOwner: 'owner', repoName: 'repo' })
    })

    it('should return null for invalid URLs', () => {
      const result = parseGithubRepoUrl('not-a-valid-url')
      expect(result).toBeNull()
    })
  })
})
